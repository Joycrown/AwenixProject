import { NavLink } from "react-router-dom";

function LeftBar() {
  return (
    <div className="space-y-4 min-w-40">
      <h4 className="font-medium">My Account</h4>
      <div className="flex flex-col gap-3 pl-6">
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-default-400 text-opacity-80" : "text-default-300"
          }
          to="/account/dashboard/profile"
        >
          My Profile
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-default-400 text-opacity-80" : "text-default-300"
          }
          to="/account/dashboard/orders"
        >
          My Orders
        </NavLink>
      </div>
    </div>
  );
}

export default LeftBar;
