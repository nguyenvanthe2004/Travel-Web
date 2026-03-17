import {
  IsMongoId,
  IsNumber,
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
} from "class-validator";
import { BookingStatus } from "../models/Booking";

export class CreateBookingDto {
  @IsMongoId()
  roomId: string;

  @IsString()
  info: string;

  @IsNumber()
  nights: number;

  @IsDateString()
  checkIn: Date;

  @IsDateString()
  checkOut: Date;

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
