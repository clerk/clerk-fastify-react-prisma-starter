import styles from "./Header.module.css";
import { ReactComponent as ClerkLogo } from "../assets/clerk-logo.svg";
import { SignedOut, SignedIn, useClerk, withClerk } from "@clerk/clerk-react";
import { Button } from "./Button";
import { Link } from "react-router-dom";

export const Header = withClerk(() => {
  const clerk = useClerk();

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.logoRow}>
          <Link to="/" className={styles.logoLink}>
            <ClerkLogo />
            <span className={styles.logoRowTitle}>ClerkApartments</span>
          </Link>
          <SignedIn>
            <div className={styles.separator}></div>
            <Link to="/my-apartments">
              <span className={styles.logoRowLink}>My Apartments</span>
            </Link>
          </SignedIn>
        </div>
        <div className={styles.authButtons}>
          <SignedOut>
            <Button handleClick={clerk.openSignIn} naked>
              Login
            </Button>
            <Button handleClick={clerk.openSignUp}>Sign up</Button>
          </SignedOut>
          <SignedIn>
            <Button handleClick={() => clerk.signOut()} naked>
              Logout
            </Button>
            <Button handleClick={clerk.redirectToUserProfile}>
              My Profile
            </Button>
          </SignedIn>
        </div>
      </div>
    </div>
  );
});
