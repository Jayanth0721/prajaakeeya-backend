import { Module } from "@nestjs/common";
import { PdfUploadController } from "./pdf-upload.controller";
import { ExtractionModule } from "../extraction/extraction.module";

@Module({
  imports: [ExtractionModule],
  controllers: [PdfUploadController],
})
export class PdfUploadModule {}
