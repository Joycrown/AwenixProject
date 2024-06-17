/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { googleIcon } from "../../../assets";
import { toast } from "react-toastify";

function Register() {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const endpoint = import.meta.env.VITE_AWENIX_BACKEND_URL;
    const body = {
      name: details.name,
      password: details.password,
      email: details.email,
      phone_no: details.phone,
    };

    axios
      .post(`${endpoint}/signup`, body)
      .then(() => {
        toast.success("Account Successfully, log in...");
        setTimeout(() => {
          navigate("/account/login");
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  const handleSignUp = () => {
    console.log("Signing up with google");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center gap-4 text-black h-full w-full max-w-sm mx-auto"
    >
      <h2>Create an account</h2>
      <p>Enter your details below</p>

      {/* Name */}
      <input
        placeholder="Name"
        className="border-b px-2 py-3 outline-none"
        value={details.name}
        onChange={(e) =>
          setDetails((prev) => ({ ...prev, name: e.target.value }))
        }
        required
      />

      {/* Email address */}
      <input
        type="email"
        placeholder="Email address"
        className="border-b px-2 py-3 outline-none"
        value={details.email}
        onChange={(e) =>
          setDetails((prev) => ({ ...prev, email: e.target.value }))
        }
        required
      />

      {/* Phone number */}
      <input
        placeholder="Phone number"
        className="border-b px-2 py-3 outline-none"
        value={details.phone}
        onChange={(e) =>
          setDetails((prev) => ({ ...prev, phone: e.target.value }))
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
        required
      />

      <button
        type="submit"
        className="py-3 px-6 bg-default-500 text-white rounded outline-none border-none"
      >
        Create Account
      </button>

      <div
        onClick={handleSignUp}
        className="w-full py-3 px-4 cursor-pointer bg-transparent flex gap-4 items-center justify-center border-default-100 border rounded-md"
      >
        <img className="w-6 mx-0" src={googleIcon} alt="Sign up with google" />{" "}
        Sign up with Google
      </div>

      <p className="text-center text-sm">
        Already have account?{" "}
        <Link
          className="hover:underline underline-offset-8 hover:text-default-500"
          to="/account/login"
        >
          Log in
        </Link>
      </p>
    </form>
  );
}

export default Register;
