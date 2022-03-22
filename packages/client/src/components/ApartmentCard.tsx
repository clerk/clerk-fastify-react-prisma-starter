import { useClerk, withClerk } from "@clerk/clerk-react";
import { WithClerkProp } from "@clerk/clerk-react/dist/types";
import clsx from "clsx";
import { Apartment } from "../types";
import styles from "./ApartmentCard.module.css";

type ApartmentCardProps = {
  apartment: Apartment;
  foregoApartment?: () => Promise<void>;
  claimApartment?: () => Promise<void>;
};

export function ApartmentCard({
  apartment,
  foregoApartment,
  claimApartment,
}: ApartmentCardProps): JSX.Element {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          alt="apartment"
          src={apartment.imageURL}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{apartment.title}</div>
        <div className={styles.amenities}>
          {apartment.amenities.join(" | ")}
        </div>
        <div className={styles.priceContainer}>
          <div>
            from <span className={styles.amount}>{apartment.price}$</span>/month
          </div>
          {claimApartment && (
            <ClaimApartment
              claimApartment={claimApartment}
              claimedBy={apartment.claimedBy}
            />)}
          {foregoApartment && (
            <button
              className={clsx(styles.actionButton, styles.forego)}
              onClick={foregoApartment}
            >
              Forego
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

type ClaimApartmentProps = WithClerkProp<{
  claimedBy: string | null;
  claimApartment: () => Promise<void>;
}>;

const ClaimApartment = withClerk(
  ({ claimedBy, claimApartment }: ClaimApartmentProps) => {
    const clerk = useClerk();

    return (
      <button
        disabled={Boolean(claimedBy)}
        className={clsx(styles.actionButton, claimedBy && styles.claimed)}
        onClick={clerk.user ? claimApartment : () => clerk.openSignIn()}
      >
        {claimedBy ? "Claimed" : "Claim"}
      </button>
    );
  }
);
