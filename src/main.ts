import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { DateToTimestampInterceptor } from "./common/interceptors/date-to-timestamp.interceptor";
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security headers
  app.use(helmet());

  app.getHttpAdapter().getInstance().set("trust proxy", 1);
  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new DateToTimestampInterceptor());

  // CORS: restrict origins based on environment
  const allowedOrigins =
    process.env.NODE_ENV === "production"
      ? [
          "https://prajaakeeya.in",
          "https://www.prajaakeeya.in",
          "https://prajaakeeya.org",
          "https://www.prajaakeeya.org",
        ]
      : [
          "http://localhost:5173",
          "https://main.d1kab1stclinb2.amplifyapp.com",
          "https://prajaakeeya.in",
          "https://www.prajaakeeya.in",
          "https://lanch-dev.d1kab1stclinb2.amplifyapp.com",
          "https://staging.d1kab1stclinb2.amplifyapp.com",
          "https://staging.prajaakeeya.in",
          "https://prajaakeeya.org",
          "https://www.prajaakeeya.org",
        ];
  app.enableCors({ origin: allowedOrigins, credentials: true });

  // Swagger: only enable in non-production environments
  if (process.env.NODE_ENV !== "production") {
    const config = new DocumentBuilder()
      .setTitle("Prajaakeeya API")
      .setDescription("API for Prajaakeeya ward voter selection")
      .setVersion("2.0")
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("bba6b5eb2fa88335dshb834jhb3chq36", app, document);
  }

  const port = process.env.PORT || 3000;
  await app.listen(port);
}

void bootstrap();
