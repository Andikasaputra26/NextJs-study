import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Login.module.scss";

const LoginViews = () => {
  const { push } = useRouter();
  const handleLogin = () => {
    push("/product");
  };
  return (
    <div className={styles.login}>
      <h1 className="font-bold text-4xl rounded-lg">Login Page</h1>
      <button onClick={() => handleLogin()}>login</button>
      <p>Belum punya akun? Registrasi</p>
      <Link href={"/auth/register"}>disini</Link>
    </div>
  );
};

export default LoginViews;
