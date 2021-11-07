import { Apartment as ApartmentModelType } from "@cfrp/db";

export type Apartment = Pick<
  ApartmentModelType,
  "id" | "amenities" | "title" | "price" | "imageURL" | "claimedBy"
>;
