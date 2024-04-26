import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { Suspense } from "react";

function DefaultRoutes() {
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

export default DefaultRoutes;
