import { Link, Route, Routes } from "react-router-dom";
import LeftBar from "./leftBar";
import Profile from "./profile";

function Dashboard() {
  return (
    <section className="max-w-screen-lg w-[95%] mx-auto space-y-12 pt-12 text-sm pb-16">
      <div className="flex justify-between gap-4">
        <h4>
          <Link to="/account/home" className="text-default-700">
            Home
          </Link>{" "}
          / Dashboard
        </h4>
        <h4>
          Welcome <span className="text-default-400">Michael Ajayi</span>
        </h4>
      </div>
      <div className="flex gap-12">
        <LeftBar />

        <div className="p-12 shadow-[0_4px_15px_-1px_rgba(0,0,0,0.1)] flex-1 rounded-lg space-y-4">
          <Routes>
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
