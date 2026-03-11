import { Hotel } from "./hotel";

export interface Location {
  _id: string;
  name: string;
  images: string[];
  hotels: Hotel[]
}

