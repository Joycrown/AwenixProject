import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../utils/authContextProvider";
import { useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

function ProtectedRoutes() {
  const { user } = useAuthContext();

  useEffect(() => {
    if (user === ("" || null || undefined)) <Navigate to="/account/" />;
  }, [user]);

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}

export default ProtectedRoutes;
