import { Injectable } from "@nestjs/common";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get("AWS_REGION") || "ap-south-1",
      credentials: {
        accessKeyId: this.configService.get("AWS_ACCESS_KEY_ID") || "",
        secretAccessKey: this.configService.get("AWS_SECRET_ACCESS_KEY") || "",
      },
    });
    this.bucketName =
      this.configService.get("AWS_S3_BUCKET_NAME") || "prajaakeeya";
  }

  /**
   * Upload a file to S3
   * @param file - Express.Multer.File object
   * @param folder - Optional folder path in S3
   * @returns S3 object URL
   */
  async uploadFile(
    file: Express.Multer.File,
    folder?: string,
  ): Promise<string> {
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.originalname.replace(/\s+/g, "-")}`;
    const key = folder ? `${folder}/${fileName}` : fileName;

    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: this.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      },
    });

    await upload.done();

    // Construct object URL (note: bucket may be private; use presign for access)
    return `https://${this.bucketName}.s3.${this.configService.get("AWS_REGION")}.amazonaws.com/${key}`;
  }

  /**
   * Delete a file from S3
   * @param fileUrl - Full S3 URL
   */
  async deleteFile(fileUrl: string): Promise<void> {
    try {
      const key = this.extractKeyFromUrl(fileUrl);
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });
      await this.s3Client.send(command);
    } catch (error) {
      console.error("Error deleting file from S3:", error);
    }
  }

  /**
   * Extract S3 key from full URL
   */
  private extractKeyFromUrl(url: string): string {
    const urlParts = url.split(".amazonaws.com/");
    return urlParts.length > 1 ? urlParts[1] : "";
  }

  /**
   * Generate a presigned GET URL for a key
   */
  async getPresignedUrl(key: string, expiresInSeconds = 3600): Promise<string> {
    // If the bucket is configured as public, return the direct object URL
    const isPublic = this.configService.get("AWS_PUBLIC_BUCKET");
    if (
      isPublic === true ||
      String(isPublic).toLowerCase() === "true" ||
      String(isPublic) === "1"
    ) {
      return `https://${this.bucketName}.s3.${this.configService.get("AWS_REGION")}.amazonaws.com/${key}`;
    }

    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    return await getSignedUrl(this.s3Client, command, {
      expiresIn: expiresInSeconds,
    });
  }
}
