import { Link } from "react-router-dom";
import { logo } from "../assets";

import { IoClose, IoMenu } from "react-icons/io5";
import { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      <header className="sm:px-16 px-8 py-4 z-10 bg-white w-full">
        <nav className="flex justify-between max-container items-center">
          <button
            className="sm:block md:block lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
           { isOpen ? <IoMenu fontSize={'2rem'}/> :<IoClose fontSize={'2rem'} />}
          </button>
          <ul className={`sm:absolute sm:top-20
          sm:right-0
           sm:w-full sm:h-full 
           sm:transition-timing-function: cubic-bezier(0.4, 0, 1, 1)
           ${isOpen ? 'sm:flex sm:flex-col' : 'hidden'}
          sm:bg-white sm:items-center 
          sm:gap-12 lg:hidden max-lg:hidden`}>
            <li className="leading-normal text-lg ">
              <Link to="/home">Home</Link>
            </li>
            <li className="leading-normal text-lg">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="leading-normal text-lg">
              <Link to="/about">About</Link>
            </li>
            <li className="leading-normal text-lg">
              <Link to="/account">Account</Link>
            </li>
          </ul>
          <div>
            <Link to="/">
              <img
                src={logo}
                alt="Awenix logo"
                width={'20px'}
                height={'20px'}
              />
            </Link>
          </div>
          <ul className="flex justify-center items-center gap-12 sm:hidden lg:flex max-lg:hidden">
            <li className="leading-normal text-lg ">
              <Link to="/home">Home</Link>
            </li>
            <li className="leading-normal text-lg">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="leading-normal text-lg">
              <Link to="/about">About</Link>
            </li>
            <li className="leading-normal text-lg">
              <Link to="/account">Account</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
