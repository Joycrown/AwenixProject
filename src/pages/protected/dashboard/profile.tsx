import { ChangeEvent, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
function Profile() {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm_new: "",
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;

    setUserDetails((details) => ({ ...details, [id]: value }));
  };

  return (
    <>
      <h4 className="text-default-400 text-xl">Edit your profile</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              value={userDetails.firstName}
              onChange={handleInputChange}
              className="border outline-none p-3 rounded text-xs font-normal focus:border-default-500 focus:shadow-md shadow-default-500 bg-neutral-200 text-black"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={userDetails.lastName}
              onChange={handleInputChange}
              className="border outline-none p-3 rounded text-xs font-normal focus:border-default-500 focus:shadow-md shadow-default-500 bg-neutral-200 text-black"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              value={userDetails.email}
              onChange={handleInputChange}
              className="border outline-none p-3 rounded text-xs font-normal focus:border-default-500 focus:shadow-md shadow-default-500 bg-neutral-200 text-black"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Address"
              value={userDetails.address}
              onChange={handleInputChange}
              className="border outline-none p-3 rounded text-xs font-normal focus:border-default-500 focus:shadow-md shadow-default-500 bg-neutral-200 text-black"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label>Password Changes</label>
          <input
            required
            type="password"
            maxLength={19}
            id="current"
            value={password.current}
            placeholder="Current Password"
            onChange={(e) =>
              setPassword((prev) => ({
                ...prev,
                current: e.target.value,
              }))
            }
            className="border outline-none p-3 rounded text-xs font-normal focus:border-default-500 focus:shadow-md shadow-default-500 bg-neutral-200 text-black"
          />
          <input
            required
            type="password"
            maxLength={19}
            id="new"
            value={password.new}
            placeholder="New Password"
            onChange={(e) =>
              setPassword((prev) => ({
                ...prev,
                new: e.target.value,
              }))
            }
            className="border outline-none p-3 rounded text-xs font-normal focus:border-default-500 focus:shadow-md shadow-default-500 bg-neutral-200 text-black"
          />
          <input
            required
            type="password"
            maxLength={19}
            id="confirm_new"
            value={password.confirm_new}
            placeholder="Confirm Password"
            onChange={(e) =>
              setPassword((prev) => ({
                ...prev,
                confirm_new: e.target.value,
              }))
            }
            className="border outline-none p-3 rounded text-xs font-normal focus:border-default-500 focus:shadow-md shadow-default-500 bg-neutral-200 text-black"
          />
        </div>

        <div className="ml-auto w-fit flex gap-3">
          <button
            type="reset"
            className="py-3 px-4 cursor-pointer rounded text-center border-0 outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-default-500 text-white py-3 px-4 cursor-pointer rounded text-center border-0 outline-none"
          >
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
}

export default Profile;
