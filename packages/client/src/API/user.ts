import { Apartment } from "../types";
import { fetcher } from "./fetcher";

export async function getUserApartments(): Promise<Apartment[]> {
  return await (await fetcher("/user/apartments", {}, true)).json();
}

export async function foregoApartment(apartmentId: string) {
  return await fetcher(
    "/user/forego",
    { method: "POST", body: JSON.stringify({ apartmentId }) },
    true
  );
}
