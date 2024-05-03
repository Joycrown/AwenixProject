import { Link } from "react-router-dom";
import { logo } from "../assets";

import { IoCartOutline, IoClose, IoMenu} from "react-icons/io5";
import { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { RiSearch2Line } from "react-icons/ri";


function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0)
  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact-us" },
    { name: "About", href: "/about" },
    { name: "Account", href: "/account/login" },
  ];
const handleSearch = (e: any) => {
  e.preventDefault()
  /*Search logic */
}
  return (
    <header className="max-w-[1200px] w-[95%] py-4 mx-auto">
      <nav className="flex justify-between max-container items-center">
        {/* Start Mobile */}
        <button
          className="md:hidden relative z-20"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <IoClose fontSize={"2rem"} />
          ) : (
            <IoMenu fontSize={"2rem"} />
          )}
        </button>
        <ul
          className={`fixed top-0 right-0 z-10 w-full h-screen duration-500 items-center gap-12 md:hidden bg-white pt-24 ${isOpen ? "flex flex-col" : "hidden"
            }`}
        >
          {navigationLinks.map((navLink, id) => (
            <li key={navLink.name + id} className="leading-normal text-md">
              <Link to={navLink.href} onClick={() => setIsOpen(!isOpen)}>
                {navLink.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* End Mobile */}

        {/* Desktop */}
        <Link className="relative z-10" to="/">
          <img src={logo} alt="Awenix logo" width={"20px"} height={"20px"} />
        </Link>
        <ul className="hidden md:flex justify-center items-center gap-12">
          {navigationLinks.map((navLink, id) => (
            <li key={navLink.name + id} className="leading-normal text-md">
              <Link to={navLink.href}>{navLink.name}</Link>
            </li>
          ))}
        </ul>
        {/* Desktop */}

        <div className="flex gap-1 max-md:hidden">
          <form className="max-md:hidden relative" onSubmit={handleSearch}>
            <input className="_placeholder:bg-default-100 p-2.5 rounded outline-none bg-default-800 relative" type="search" name="searchbar" placeholder="What are you looking for?" />
            <button className="absolute top-1.5 right-4" type="submit" >
              <RiSearch2Line fontSize={'1.5rem'} />
            </button>
          </form>
          <div className="flex gap-2">
            <div className="cartconcern relative">
              <IoCartOutline fontSize={'2rem'} />
              <p className="rounded-full bg-default-400 text-default-800 absolute bottom-[1.5rem] right-0">
                <span className="text-sm p-1.5">{cartCount}</span>
              </p>
            </div>
            <RxAvatar className="bg-default-500 text-default-800 rounded-full" fontSize={'2rem'} />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
