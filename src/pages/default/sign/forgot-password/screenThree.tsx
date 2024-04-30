/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ScreenThree() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log("Submitting");
    navigate("/account/login");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center gap-4 text-black h-full w-full max-w-sm mx-auto"
    >
      <h2>Forgot Password</h2>
      <p>Type in your new password</p>

      {/* Password */}
      <input
        type="password"
        placeholder="New Password"
        className="border-b px-2 py-3 outline-none"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {/* Confirm Password */}
      <input
        type="password"
        placeholder="Confirm Password"
        className="border-b px-2 py-3 outline-none"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        onInput={(e) => setConfirmPassword(e.currentTarget.value)}
        required
      />

      <button className="py-3 px-6 bg-default-500 text-white rounded outline-none border-none">
        Change Password
      </button>
    </form>
  );
}

export default ScreenThree;
