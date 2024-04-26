/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router-dom";
import { googleIcon } from "../../assets";

function Login() {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log("Submitting");
  };

  const handleSignIn = () => {
    console.log("Signing up with google");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center gap-4 text-black h-full w-full max-w-sm mx-auto"
    >
      <h2>Log in to Awenix</h2>
      <p>Enter your details below</p>

      {/* Email address or Phone number */}
      <input
        placeholder="Email or Phone number"
        className="border-b px-2 py-3 outline-none"
        value={details.email}
        onChange={(e) =>
          setDetails((prev) => ({ ...prev, email: e.target.value }))
        }
        onInput={(e) =>
          setDetails((prev) => ({ ...prev, email: e.currentTarget.value }))
        }
        required
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        className="border-b px-2 py-3 outline-none"
        value={details.password}
        onChange={(e) =>
          setDetails((prev) => ({ ...prev, password: e.target.value }))
        }
        onInput={(e) =>
          setDetails((prev) => ({ ...prev, password: e.currentTarget.value }))
        }
        required
      />
      <div>
        <Link
          className="ml-auto block w-fit text-xs hover:underline underline-offset-8 hover:text-default-500"
          to="/account/forgot-password-1"
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        className="py-3 px-6 bg-default-500 text-white rounded outline-none border-none"
      >
        Log in
      </button>

      <div
        onClick={handleSignIn}
        className="w-full py-3 px-4 cursor-pointer bg-transparent flex gap-4 items-center justify-center border-default-100 border rounded-md"
      >
        <img className="w-6 mx-0" src={googleIcon} alt="Sign up with google" />{" "}
        Sign in with Google
      </div>

      <p className="text-center text-sm">
        Don't have account?{" "}
        <Link
          className="hover:underline underline-offset-8 hover:text-default-500"
          to="/account/register"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}

export default Login;
