import { NavLink } from "react-router-dom";

function LeftBar() {
  return (
    <div className="space-y-4 sm:min-w-28 md:min-w-28 lg:min-w-40">
      <h4 className="font-medium">My Account</h4>
      <div className="flex sm:flex-col gap-3 sm:pl-6">
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
