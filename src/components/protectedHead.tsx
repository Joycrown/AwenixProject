import { logo } from "../assets";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { ImExit } from "react-icons/im";
import { RxAvatar } from "react-icons/rx";
import { FiShoppingBag } from "react-icons/fi";
import { RiSearch2Line } from "react-icons/ri";
import { useAuthContext } from "../utils/authContext";

function ProtectedHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { setUser } = useAuthContext();

  const [search, setSearch] = useState("");
  const [showAccount, setShowAccount] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /*Search logic */
    if (search === "") return;

    navigate(`/account/products?q=${search}`, {
      replace: pathname === "/account/products",
    });

    setSearch("");
  };

  const logOut = () => {
    setUser({ accessToken: "", refreshToken: "", name: "", isLogged: false });
    navigate("/");
  };

  return (
    <header className="max-w-[1200px] w-[95%] py-4 mx-auto relative">
      <nav className="flex justify-between max-container items-center">
        <Link className="relative z-10" to="/account/home">
          <img src={logo} alt="Awenix logo" width={"30px"} height={"30px"} />
        </Link>

        <div className="flex gap-3 items-center w-full max-w-80 justify-end">
          <form
            className="max-sm:hidden relative flex items-center ml-auto w-full"
            onSubmit={handleSearch}
          >
            <input
              className="_placeholder:bg-default-100 p-2.5 pr-4 w-full text-xs rounded outline-none bg-default-800"
              type="text"
              name="searchbar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="What are you looking for?"
            />
            <button className="absolute right-2.5" type="submit">
              <RiSearch2Line size="1rem" />
            </button>
          </form>

          <div className="flex gap-3 items-center">
            {showAccount && (
              <div
                onClick={() => setShowAccount(false)}
                className="fixed w-full h-screen left-0 top-0 z-20 cursor-pointer"
              />
            )}
            {/*Account options dropdown */}
            <RxAvatar
              className="bg-default-500 text-default-800 rounded-full cursor-pointer"
              size="1.5rem"
              onClick={() => {
                setShowAccount((prev) => !prev);
              }}
            />

            {showAccount && (
              <div className="absolute top-[4.55rem] right-[0.10rem] bg-opacity-25 bg-default-500 bg-blur-lg backdrop-filter backdrop-blur-lg backdrop-saturate-200 rounded-lg py-6 px-4 z-50">
                <div className="flex flex-col gap-5 text-sm">
                  <Link
                    to="/account/dashboard/profile"
                    className="flex items-center text-default-800 gap-4 cursor-pointer"
                  >
                    <RxAvatar size="1.2rem" /> Manage My Account
                  </Link>
                  <Link
                    to="/account/dashboard/orders"
                    className="flex items-center text-default-800 gap-4 cursor-pointer"
                  >
                    <FiShoppingBag size="1.2rem" /> My Orders
                  </Link>
                  <div
                    onClick={logOut}
                    className="flex items-center text-default-800 gap-4 cursor-pointer"
                  >
                    <ImExit size="1.2rem" /> Logout
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default ProtectedHeader;
