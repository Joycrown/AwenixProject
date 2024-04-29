import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../utils/authContextProvider";
import { Suspense, useEffect } from "react";
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
      <Suspense>
        <Outlet />
      </Suspense>
      <Footer />
    </main>
  );
}

export default ProtectedRoutes;
