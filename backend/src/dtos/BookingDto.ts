import {
  IsMongoId,
  IsNumber,
  IsString,
  IsOptional,
  IsEnum,
} from "class-validator";
import { BookingStatus } from "../models/Booking";

export class CreateBookingDto {
  @IsMongoId()
  roomId: string;

  @IsNumber()
  nights: number;

  @IsString()
  checkIn: string;

  @IsString()
  checkOut: string;

  @IsNumber()
  guest: number;

  @IsOptional()
  @IsString()
  request?: string;

  @IsNumber()
  total: number;
}

export class UpdateBookingDto {
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsOptional()
  @IsString()
  request?: string;
}