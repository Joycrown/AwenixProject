import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

function DefaultRoutes() {
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

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}

export default DefaultRoutes;
