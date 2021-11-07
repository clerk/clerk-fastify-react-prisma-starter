import { ApartmentCard } from "./ApartmentCard";
import { useApartments } from "../hooks";
import { GridLayout } from "../layouts/GridLayout";

export function Apartments() {
  const { apartments, claimApartment } = useApartments();

  return (
    <GridLayout>
      {apartments.map((apartment) => (
        <ApartmentCard
          key={apartment.id}
          apartment={apartment}
          claimApartment={() => claimApartment(apartment.id)}
        />
      ))}
    </GridLayout>
  );
}
