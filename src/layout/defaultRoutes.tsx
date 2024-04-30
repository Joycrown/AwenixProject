import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

function DefaultRoutes() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}

export default DefaultRoutes;
