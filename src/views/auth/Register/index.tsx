import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const data = {
      email: e.target.email.value,
      fullname: e.target.email.value,
      password: e.target.email.value,
    };
    const result = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (result.status === 200) {
      e.target.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError(
        result.status === 400 ? "Email already exists" : "Something went wrong"
      );
    }
  };
  return (
    <div className="flex items-center justify-center flex-col h-[100vh] w-[100vw]">
      <h1 className="font-bold text-3xl mb-5">Register</h1>
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
            <label htmlFor="fullname" className="">
              Fullname :
            </label>
            <input
              type="text"
              name="fullname"
              placeholder="fullname"
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
          <button type="submit" className="bg-black text-white w-full p-2 mt-5">
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
      <p>
        Have an account? Sign in{" "}
        <Link href="/auth/login" className="text-blue-600 font-bold">
          here
        </Link>
      </p>
    </div>
  );
};

export default RegisterView;
