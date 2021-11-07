import styles from "./MyApartments.module.css";
import { Link } from "react-router-dom";
import { useUserApartments } from "../hooks/useUserApartments";
import { GridLayout } from "../layouts/GridLayout";
import { ApartmentCard } from "./ApartmentCard";

export function MyApartments() {
  const { userApartments, foregoApartment } = useUserApartments();

  return (
    <GridLayout>
      {userApartments.length ? (
        userApartments.map((userApartment) => (
          <ApartmentCard
            key={userApartment.id}
            apartment={userApartment}
            foregoApartment={() => foregoApartment(userApartment.id)}
          />
        ))
      ) : (
        <GoClaimApartmentsLink />
      )}
    </GridLayout>
  );
}

function GoClaimApartmentsLink() {
  return (
    <span>
      No apartments claimed yet!{" "}
      <Link to="/" className={styles.homeLink}>
        Go claim some
      </Link>{" "}
      if available!
    </span>
  );
}
