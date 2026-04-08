import {
  Injectable,
  Logger,
  InternalServerErrorException,
  BadRequestException,
} from "@nestjs/common";
import axios from "axios";

export interface SendOtpResponse {
  verificationId: string;
  message: string;
}

export interface VerifyOtpResponse {
  verified: boolean;
  message: string;
}

@Injectable()
export class MessageCentralService {
  private readonly logger = new Logger(MessageCentralService.name);
  private readonly baseUrl = "https://cpaas.messagecentral.com/verification/v3";
  private readonly authToken: string;
  private readonly customerId: string;
  private readonly countryCode = "91"; // India

  constructor() {
    this.authToken = process.env.MESSAGE_CENTRAL_AUTH_TOKEN || "";
    this.customerId = process.env.MESSAGE_CENTRAL_CUSTOMER_ID || "";

    if (!this.authToken || !this.customerId) {
      this.logger.warn(
        "MessageCentral credentials not configured. OTP service will not work.",
      );
    }
  }

  /**
   * Send OTP to a mobile number via SMS
   * @param mobileNumber - 10 digit mobile number (without country code)
   * @returns verificationId to be used for OTP validation
   */
  async sendOtp(mobileNumber: string): Promise<SendOtpResponse> {
    try {
      // Remove any spaces or special characters from mobile number
      const cleanMobile = mobileNumber.replace(/\D/g, "");

      if (cleanMobile.length !== 10) {
        throw new BadRequestException(
          "Invalid mobile number format. Must be 10 digits.",
        );
      }

      const url = `${this.baseUrl}/send`;

      const response = await axios.post(url, null, {
        params: {
          countryCode: this.countryCode,
          customerId: this.customerId,
          flowType: "SMS",
          mobileNumber: cleanMobile,
        },
        headers: {
          authToken: this.authToken,
        },
        timeout: 10000,
      });

      this.logger.log(`OTP sent successfully to ${cleanMobile}`);

      // MessageCentral returns verificationId in response
      const verificationId =
        response.data?.data?.verificationId || response.data?.verificationId;

      if (!verificationId) {
        this.logger.error(
          "No verificationId received from MessageCentral",
          response.data,
        );
        throw new InternalServerErrorException("Failed to send OTP");
      }

      return {
        verificationId,
        message: "OTP sent successfully",
      };
    } catch (error: any) {
      this.logger.error(
        `Failed to send OTP to ${mobileNumber}:`,
        error.message,
      );

      if (error.response) {
        this.logger.error("MessageCentral API Error:", {
          status: error.response.status,
          data: error.response.data,
        });
      }

      // Handle specific MessageCentral error for insufficient credits
      const respData = error.response?.data;
      const mcMessage =
        respData?.data?.message ||
        respData?.message ||
        respData?.data?.errorMessage;
      const mcCode = respData?.data?.responseCode || respData?.responseCode;

      if (
        mcCode === 508 ||
        (typeof mcMessage === "string" &&
          mcMessage.toLowerCase().includes("insufficient credit"))
      ) {
        // Bubble up a client error so controllers can return 400 with a clear message
        throw new BadRequestException("OTP credit limit reached");
      }

      // Handle case where an OTP request already exists for the number (MessageCentral returns responseCode 506)
      if (
        mcCode === 506 ||
        mcMessage === "REQUEST_ALREADY_EXISTS" ||
        (typeof mcMessage === "string" &&
          mcMessage.toLowerCase().includes("request_already_exists"))
      ) {
        // Try to extract the existing verificationId from the response and return it instead of failing
        const existingVerificationId =
          respData?.data?.verificationId ||
          respData?.data?.transactionId ||
          respData?.verificationId;
        if (existingVerificationId) {
          this.logger.log(
            `OTP request already exists for ${mobileNumber}; returning existing verificationId ${existingVerificationId}`,
          );
          return {
            verificationId: existingVerificationId,
            message:
              "OTP request already exists; returning existing verificationId",
          };
        }
        // If no verificationId present, fall through to generic error handling below
      }

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        "Failed to send OTP. Please try again.",
      );
    }
  }

  /**
   * Verify OTP entered by user
   * @param mobileNumber - 10 digit mobile number (without country code)
   * @param verificationId - ID received when OTP was sent
   * @param code - OTP code entered by user
   * @returns verification status
   */
  async verifyOtp(
    mobileNumber: string,
    verificationId: string,
    code: string,
  ): Promise<VerifyOtpResponse> {
    try {
      // Remove any spaces or special characters from mobile number
      const cleanMobile = mobileNumber.replace(/\D/g, "");

      if (cleanMobile.length !== 10) {
        throw new BadRequestException(
          "Invalid mobile number format. Must be 10 digits.",
        );
      }

      if (!code || code.length < 4) {
        throw new BadRequestException("Invalid OTP code.");
      }

      const url = `${this.baseUrl}/validateOtp`;

      const response = await axios.get(url, {
        params: {
          countryCode: this.countryCode,
          mobileNumber: cleanMobile,
          verificationId,
          customerId: this.customerId,
          code,
        },
        headers: {
          authToken: this.authToken,
        },
        timeout: 10000,
      });

      // Check if verification was successful
      const isVerified =
        response.data?.data?.verificationStatus === "VERIFICATION_COMPLETED" ||
        response.data?.verificationStatus === "VERIFICATION_COMPLETED" ||
        response.data?.responseCode === 200;

      if (isVerified) {
        this.logger.log(`OTP verified successfully for ${cleanMobile}`);
        return {
          verified: true,
          message: "OTP verified successfully",
        };
      } else {
        this.logger.warn(`OTP verification failed for ${cleanMobile}`);
        return {
          verified: false,
          message: "Invalid OTP",
        };
      }
    } catch (error: any) {
      this.logger.error(
        `Failed to verify OTP for ${mobileNumber}:`,
        error.message,
      );

      if (error.response) {
        this.logger.error("MessageCentral API Error:", {
          status: error.response.status,
          data: error.response.data,
        });
      }

      if (error instanceof BadRequestException) {
        throw error;
      }

      // Return failed verification instead of throwing error for invalid OTPs
      return {
        verified: false,
        message: "Invalid OTP",
      };
    }
  }
}
