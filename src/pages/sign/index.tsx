import { useEffect, useState } from "react";
import { chicksSlide, eggsImage, signSlide } from "../../assets";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import ScreenOne from "./forgot-password/screenOne";
import ScreenTwo from "./forgot-password/screenTwo";
import ScreenThree from "./forgot-password/screenThree";

function Sign() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [signSlide, eggsImage, chicksSlide];

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const route = pathname.split("/")[2];

    if (route === "") {
      return navigate("/login");
    } else if (route === "forgot-password-1") {
      return setCurrentImage(1);
    } else if (route.includes("forgot-password")) {
      return setCurrentImage(2);
    }

    setCurrentImage(0);
  }, [navigate, pathname]);

  return (
    <div className="flex flex-1 sm:min-h-[85vh]">
      <div className="w-1/2 max-md:hidden">
        <img className="h-full w-full" src={images[currentImage]} alt="Sign" />
      </div>
      <div className="flex-1 px-8 lg:px-12 pt-8 pb-16">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password-1" element={<ScreenOne />} />
          <Route path="/forgot-password-2" element={<ScreenTwo />} />
          <Route path="/forgot-password-3" element={<ScreenThree />} />
        </Routes>
      </div>
    </div>
  );
}

export default Sign;
