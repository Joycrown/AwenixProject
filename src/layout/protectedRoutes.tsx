import { useEffect } from "react";
import { toast } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";

import Footer from "../components/footer";
import { parseJwt } from "../utils/parser";
import { useAuthContext } from "../utils/authContext";
import ProtectedHeader from "../components/protectedHead";

function ProtectedRoutes() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.accessToken === "" || user.accessToken === undefined) {
      navigate("/account/login");
      return;
    }

    const decodedUser = parseJwt(user.accessToken);
    if (decodedUser.exp * 1000 < Date.now()) {
      toast.error("Please login again...");
    }
  }, [user, navigate]);

  return (
    <main className="flex flex-col min-h-screen">
      <ProtectedHeader />
      <Outlet />
      <Footer />
    </main>
  );
}

export default ProtectedRoutes;
