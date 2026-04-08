import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateHandRaiseDto {
  @ApiProperty({
    example: "Road Issue",
    description:
      "Category of the issue (e.g. Road Issue, Electricity Issue, Garbage Issue, ...)",
  })
  @IsString()
  category!: string;
}
