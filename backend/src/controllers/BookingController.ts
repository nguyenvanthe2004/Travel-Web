import {
  Authorized,
  Body,
  CurrentUser,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  QueryParam,
} from "routing-controllers";
import { Service } from "typedi";
import { BookingService } from "../services/BookingService";
import { CreateBookingDto, UpdateBookingDto } from "../dtos/BookingDto";
import { UserProps } from "../types/auth";
import { BookingStatus } from "../models/Booking";

@Service()
@JsonController("/bookings")
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get("/count/status")
  async countBySingleStatus(@QueryParam("userId") userId?: string) {
    return this.bookingService.countByStatus(userId);
  }

  @Get("/")
  async findAll(
    @QueryParam("page") page: number,
    @QueryParam("limit") limit: number,
    @QueryParam("status") status?: string,
    @QueryParam("userId") userId?: string,
  ) {
    return await this.bookingService.findAll(
      +page,
      +limit,
      status as BookingStatus,
      userId,
    );
  }

  @Get("/room/:roomId/dates")
  async getBookedDates(@Param("roomId") roomId: string) {
    return this.bookingService.findBookedDates(roomId);
  }

  @Get("/my-booking")
  async findCurrentBooking(
    @QueryParam("page") page: number,
    @QueryParam("limit") limit: number,
    @CurrentUser() user: UserProps,
    @QueryParam("status") status?: string,
  ) {
    return await this.bookingService.findByUser(
      +page,
      +limit,
      user,
      status as BookingStatus,
    );
  }
  @Get("/booking-manager")
  async findBookingOwner(
    @QueryParam("page") page: number,
    @QueryParam("limit") limit: number,
    @CurrentUser() user: UserProps,
    @QueryParam("status") status?: string,
  ) {
    return await this.bookingService.findByOwner(
      +page,
      +limit,
      user,
      status as BookingStatus,
    );
  }
  @Get("/:id")
  async findBookingById(@Param("id") id: string) {
    return await this.bookingService.getBookingById(id);
  }

  @Post("/")
  async create(
    @Body({ validate: true }) data: CreateBookingDto,
    @CurrentUser() user: UserProps,
  ) {
    return this.bookingService.create(data, user);
  }

  @Put("/:id")
  async update(
    @Param("id") bookingId: string,
    @Body({ validate: true }) body: UpdateBookingDto,
    @CurrentUser() user: UserProps,
  ) {
    return this.bookingService.update(bookingId, body, user);
  }

  @Put("/:id/cancel")
  async cancel(@Param("id") bookingId: string, @CurrentUser() user: UserProps) {
    return this.bookingService.cancel(bookingId, user);
  }

  @Delete("/:id")
  async delete(@Param("id") bookingId: string, @CurrentUser() user: UserProps) {
    return this.bookingService.delete(bookingId, user);
  }
}
