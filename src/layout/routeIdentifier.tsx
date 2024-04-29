import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

function RouteIdentifier() {
  const { pathname } = useLocation();

  useEffect(() => {
    let routeName = pathname.split("/")[1];
    routeName =
      routeName === ""
        ? "Home"
        : routeName === "protected"
        ? "account"
        : routeName;

    const title = routeName.charAt(0).toUpperCase() + routeName.slice(1);

    document.title = `Awenix | ${title}`;

    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default RouteIdentifier;
