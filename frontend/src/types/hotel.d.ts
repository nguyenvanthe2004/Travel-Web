import { HotelStatus } from "../constants";

export interface IHotel {
  _id: string;
  name: string;
  image: string;
  city: string;
  country: string;
  price: number;
  status: HotelStatus;
}
