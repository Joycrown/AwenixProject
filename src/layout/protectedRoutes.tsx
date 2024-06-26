/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Footer from "../components/footer";
import { parseJwt } from "../utils/parser";
import { useAuthContext } from "../utils/authContext";
import ProtectedHeader from "../components/protectedHead";

function ProtectedRoutes() {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Scroll to the section when the page mounts
    if (location.hash) {
      const sectionId = location.hash.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Scroll to the top of the page if no hash is provided
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    if (user.accessToken === "" || user.accessToken === undefined) {
      setUser({
        name: "",
        accessToken: "",
        refreshToken: "",
        isLogged: false,
      });
      navigate("/account/login");
      return;
    }

    const decodedUser = parseJwt(user.accessToken);
    const endpoint = import.meta.env.VITE_AWENIX_BACKEND_URL;

    if (decodedUser.exp * 1000 < Date.now()) {
      axios
        .post(
          `${endpoint}/token/refresh`,
          { refresh_token: user.refreshToken },
          {
            data: {
              refresh_token: user.refreshToken,
            },
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          const { access_token } = res.data;

          setUser({
            ...user,
            accessToken: access_token,
          });
        })
        .catch(() => {
          setUser({
            name: "",
            accessToken: "",
            refreshToken: "",
            isLogged: false,
          });

          toast.error("Please login again...");
          navigate("/account/login", { replace: true });
        });
    }
  }, [navigate]);

  return (
    <main className="flex flex-col min-h-screen">
      <ProtectedHeader />
      <Outlet />
      <Footer />
    </main>
  );
}

export default ProtectedRoutes;
