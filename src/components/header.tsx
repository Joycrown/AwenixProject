import { Link } from "react-router-dom";
import { logo } from "../assets";

import { IoClose, IoMenu } from "react-icons/io5";
import { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact-us" },
    { name: "About", href: "/about" },
    { name: "Account", href: "/account/login" },
  ];

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
          className={`fixed top-0 right-0 z-10 w-full h-screen duration-500 items-center gap-12 md:hidden bg-white pt-24 ${
            isOpen ? "flex flex-col" : "hidden"
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

        <div className="max-md:hidden" />
      </nav>
    </header>
  );
}

export default Header;
