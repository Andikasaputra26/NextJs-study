import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Email or Password is incorrect");
      }
    } catch (erro: any) {
      setIsLoading(false);
      setError("Email or Password is incorrect");
    }
  };
  return (
    <div className="flex items-center justify-center flex-col h-[100vh] w-[100vw]">
      <h1 className="font-bold text-3xl mb-5">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="w-1/3 shadow-sm p-5">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col m-2">
            <label htmlFor="email" className="">
              Email :
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="p-2 bg-gray-200 mt-2"
            />
          </div>

          <div className="flex flex-col m-2">
            <label htmlFor="password" className="">
              Password :
            </label>
            <input
              type="password"
              name="password"
              placeholder="Masukkan Password"
              className="p-2 bg-gray-200 mt-2"
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white w-full p-2 mt-5"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <button
          className="text-black w-full p-2 mt-5"
          onClick={() =>
            signIn("google", {
              callbackUrl,
              redirect: false,
            })
          }
        >
          Sign In With Google
        </button>
      </div>
      <p>
        Don{"'"}Have an account? Sign up{" "}
        <Link href="/auth/register" className="text-blue-600 font-bold">
          here
        </Link>
      </p>
    </div>
  );
};

export default LoginView;
