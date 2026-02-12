import { IsArray, IsString, MinLength } from "class-validator";

export class CreateLocationDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];
}
export class UpdateLocationDto {
  @IsString()
  @MinLength(2)
  name?: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];
}
