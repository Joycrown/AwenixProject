import { Link, Route, Routes } from "react-router-dom";
import LeftBar from "./leftBar";
import Profile from "./profile";
import { useAuthContext } from "../../../utils/authContext";
import Orders from "./orders";

function Dashboard() {
  const { user } = useAuthContext();

  return (
    <section className="max-w-screen-lg w-[95%] mx-auto space-y-6 sm:space-y-12 pt-12 text-sm pb-16">
      <div className="flex max-xs:flex-col justify-between gap-4">
        <h4>
          <Link to="/account/home" className="text-default-700">
            Home
          </Link>{" "}
          / Dashboard
        </h4>
        <h4>
          Welcome <span className="text-default-400">{user.name}</span>
        </h4>
      </div>

      <div className="flex gap-6 sm:gap-12 max-sm:flex-col">
        <LeftBar />

        <Routes>
          <Route
            path="/profile"
            element={
              <div className="p-6 sm:p-12 shadow-[0_4px_15px_-1px_rgba(0,0,0,0.1)] flex-1 rounded-lg space-y-4">
                <Profile />
              </div>
            }
          />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </section>
  );
}

export default Dashboard;
