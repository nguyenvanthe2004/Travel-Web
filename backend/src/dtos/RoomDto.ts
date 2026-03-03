import {
  IsString,
  MinLength,
  IsMongoId,
  IsOptional,
  IsEnum,
  IsArray,
  IsNumber,
} from "class-validator";
import { RoomStatus } from "../models/Room";

export class CreateRoomDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(2)
  description: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsNumber()
  @IsOptional()
  maxGuests: number;

  @IsNumber()
  @IsOptional()
  wide: number;

  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsEnum(RoomStatus)
  status?: RoomStatus;

  @IsMongoId()
  hotelId: string;
}
export class UpdateRoomDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  description?: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsNumber()
  @IsOptional()
  maxGuests: number;

  @IsNumber()
  @IsOptional()
  wide: number;

  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsEnum(RoomStatus)
  status: RoomStatus;

  @IsMongoId()
  hotelId: string;
}
