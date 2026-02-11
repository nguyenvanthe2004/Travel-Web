import {
  IsString,
  MinLength,
  IsMongoId,
  IsOptional,
  IsEnum,
  IsArray,
} from "class-validator";
import { HotelStatus } from "../models/Hotel";

export class CreateHotelDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(2)
  address: string;

  @IsString()
  @MinLength(2)
  description: string;

  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsEnum(HotelStatus)
  status?: HotelStatus;

  @IsMongoId()
  locationId: string;
}
export class UpdateHotelDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  address?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  description?: string;

  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsMongoId()
  locationId: string;

  @IsEnum(HotelStatus)
  status: HotelStatus;
}
export class UpdateHotelStatusDto {
  @IsEnum(HotelStatus)
  status: HotelStatus;
}
