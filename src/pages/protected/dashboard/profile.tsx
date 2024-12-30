import axios from "axios";
import { toast } from "react-toastify";
import { ChangeEvent, useEffect, useState } from "react";
import { useAuthContext } from "../../../utils/authContext";
import LoadingScreen from "../../../components/loadingScreen";
import PasswordInput from "../../../components/passwordInput";

/* eslint-disable @typescript-eslint/no-explicit-any */
function Profile() {
  const { user } = useAuthContext();
  const endpoint = import.meta.env.VITE_AWENIX_BACKEND_URL;
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone_no: "",
  });

  const [password, setPassword] = useState({
    current: "",
    newPass: "",
    confirm_new: "",
  });

  useEffect(() => {
    setLoadingProfile(true);
    axios
      .get(`${endpoint}/current_user`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        const { email, name, phone_no } = res.data;

        setUserDetails({
          name: name,
          email,
          phone_no,
        });
        setLoadingProfile(false);
        
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status === 400) {
          toast.error(err?.response?.data?.detail);
        }
        setLoadingProfile(false);
      });
  }, [user, endpoint]);

  const validatePasswords = () => {
    const { newPass, confirm_new, current } = password;

    if (newPass && !current) {
      toast.error("Please enter your current password");
      return false;
    }

    if (newPass.length > 0 && newPass.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return false;
    }

    if (newPass !== confirm_new) {
      toast.error("New password and confirm password don't match");
      return false;
    }

    return true;
  };

  const prepareUpdateData = () => {
    const { name, phone_no, email } = userDetails;
    const { newPass, current } = password;

    // Send all fields as per endpoint expectations
    const postData = {
      name,
      email,
      phone_no,
      current_password: current,
      new_password: newPass,
    };

    return postData;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Validate passwords if either current or new password is provided
    if (password.current || password.newPass) {
      if (!validatePasswords()) {
        return;
      }
    }

    setLoading(true);
    const postData = prepareUpdateData();

    axios
      .patch(`${endpoint}/update/details`, postData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then(() => {
        toast.success("Profile updated successfully");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.detail || "Error updating profile");
        console.error(err);
      });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;
    setUserDetails((details) => ({ ...details, [id]: value }));
  };

  return (
    <>
      {loading && <LoadingScreen />}
      <div>
        {loadingProfile ? (
          <div>Loading Profile...</div>
        ) : (
          <>
            <h4 className="text-default-400 text-xl">Edit your profile</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex max-sm:flex-col gap-3">
                <div className="flex flex-col gap-3 w-1/2">
                  <label htmlFor="firstName">Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    value={userDetails.name ? userDetails.name : ""}
                    onChange={handleInputChange}
                    className="border outline-none p-3 rounded text-xs font-normal focus:border-default-500 focus:shadow-md shadow-default-500 bg-neutral-200 text-black"
                  />
                </div>
              </div>

              <div className="flex max-sm:flex-col gap-3">
                <div className="flex flex-col gap-3 w-full">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Email"
                    value={userDetails.email ? userDetails.email : ""}
                    onChange={handleInputChange}
                    className="border outline-none p-3 rounded text-xs font-normal focus:border-default-500 focus:shadow-md shadow-default-500 bg-neutral-200 text-black"
                  />
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <label htmlFor="phone_no">Phone Number</label>
                  <input
                    type="text"
                    id="phone_no"
                    placeholder="phone_no"
                    value={userDetails.phone_no ? userDetails.phone_no : ""}
                    onChange={handleInputChange}
                    className="border outline-none p-3 rounded text-xs font-normal focus:border-default-500 focus:shadow-md shadow-default-500 bg-neutral-200 text-black"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label>Password Changes</label>

                <PasswordInput
                  value={password.current}
                  setValue={(value: string) =>
                    setPassword((prev) => ({
                      ...prev,
                      current: value,
                    }))
                  }
                  id="password"
                  required={false}
                  placeholder="Current Password"
                  customClass
                />

                <PasswordInput
                  value={password.newPass}
                  setValue={(value: string) =>
                    setPassword((prev) => ({
                      ...prev,
                      newPass: value,
                    }))
                  }
                  id="newPassword"
                  required={false}
                  placeholder="New Password"
                  customClass
                />

                <PasswordInput
                  value={password.confirm_new}
                  setValue={(value: string) =>
                    setPassword((prev) => ({
                      ...prev,
                      confirm_new: value,
                    }))
                  }
                  id="confirmPassword"
                  required={false}
                  placeholder="Confirm Password"
                  customClass
                />
              </div>

              <div className="ml-auto w-fit flex gap-3">
                <button
                  type="reset"
                  onClick={() => window.location.reload()}
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
        )}
      </div>
    </>
  );
}

export default Profile;