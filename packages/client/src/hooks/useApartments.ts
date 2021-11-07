import { useEffect, useState } from "react";
import {
  getApartments,
  claimApartment as claimApartmentApi,
  getUserApartments as getUserApartmentsApi,
} from "../API";
import { Apartment } from "../types";

export function useApartments(): {
  apartments: Apartment[];
  userApartments: Apartment[];
  claimApartment: (apartmentId: string) => Promise<void>;
  getUserApartments: () => Promise<void>;
} {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [userApartments, setUserApartments] = useState<Apartment[]>([]);

  useEffect(() => {
    async function getApartmentsState() {
      const apartments = await getApartments();
      setApartments(apartments);
    }
    getApartmentsState();
  }, []);

  const claimApartment = async (apartmentId: string) => {
    try {
      const updatedApartment = await claimApartmentApi(apartmentId);
      setApartments(
        apartments.map((apartment) =>
          apartment.id === apartmentId
            ? { ...apartment, claimedBy: updatedApartment.claimedBy }
            : apartment
        )
      );
    } catch (err) {
      throw err;
    }
  };

  const getUserApartments = async () => {
    try {
      const userClaimedApartments = await getUserApartmentsApi();
      setUserApartments(userClaimedApartments);
    } catch (err) {
      throw err;
    }
  };

  return { apartments, userApartments, claimApartment, getUserApartments };
}
