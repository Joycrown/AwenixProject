import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

function RouteIdentifier() {
  const { pathname } = useLocation();

  useEffect(() => {
    const route = pathname.split("/");
    let routeName = route[route.length - 1];
    routeName = routeName === "" ? "Home" : routeName;

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
