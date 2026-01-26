import { IsString, MinLength } from "class-validator";

export class CreateLocationDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  image: string;
}
export class UpdateLocationDto {
  @IsString()
  @MinLength(2)
  name?: string;

  @IsString()
  image?: string;
}
