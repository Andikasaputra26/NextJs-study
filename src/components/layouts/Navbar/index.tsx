import styles from "./Navbar.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
const Navbar = () => {
  const { data }: any = useSession();
  console.log(data);
  return (
    <div className={styles.navbar}>
      Navbar
      {/* <Link className={styles.navbar} href="/product">
        Product
      </Link> */}
      <div>
        {data && data.user.fullname}
        {data ? (
          <button className={styles.button} onClick={() => signOut()}>
            Sign Out
          </button>
        ) : (
          <button className={styles.button} onClick={() => signIn()}>
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
