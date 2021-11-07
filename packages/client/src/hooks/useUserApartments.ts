import { useEffect, useState } from "react";
import {
  getUserApartments as getUserApartmentsApi,
  foregoApartment as foregoApartmentApi,
} from "../API";
import { Apartment } from "../types";

export function useUserApartments(): {
  userApartments: Apartment[];
  getUserApartments: () => Promise<void>;
  foregoApartment: (apartmentId: string) => Promise<void>;
} {
  const [userApartments, setUserApartments] = useState<Apartment[]>([]);

  useEffect(() => {
    getUserApartments();
  }, []);

  const getUserApartments = async () => {
    try {
      const userClaimedApartments = await getUserApartmentsApi();
      setUserApartments(userClaimedApartments);
    } catch (err) {
      throw err;
    }
  };

  const foregoApartment = async (apartmentId: string) => {
    try {
      /** Find the foregone apartment and remove it from my apartments. */
      await foregoApartmentApi(apartmentId);
      const deletedPostIndex = userApartments.findIndex(
        (apartment) => apartment.id === apartmentId
      );
      userApartments.splice(deletedPostIndex, 1);
      setUserApartments([...userApartments]);
    } catch (err) {
      throw err;
    }
  };

  return { userApartments, getUserApartments, foregoApartment };
}
