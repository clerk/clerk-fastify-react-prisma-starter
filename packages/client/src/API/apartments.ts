import { Apartment } from "../types";
import { fetcher } from "./fetcher";

export async function getApartments(): Promise<Apartment[]> {
  return await (await fetcher("/apartments")).json();
}

export async function claimApartment(apartmentId: string): Promise<Apartment> {
  return await (
    await fetcher(
      "/apartments/claim",
      { method: "POST", body: JSON.stringify({ apartmentId }) },
      true
    )
  ).json();
}
