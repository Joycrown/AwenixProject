import { Link } from "react-router-dom";
import { logo } from "../assets";
import { FaBars } from "react-icons/fa6";

function Header() {
  return (
    <div className="flex">
      <header className="sm:px-16 px-8 py-4 z-10 bg-white w-full">

        <nav className="flex justify-between max-container items-center">
          <button className="sm:block md:block lg:hidden">
            <FaBars fontSize={'2rem'} />
          </button>
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
            <li className="leading-normal text-lg "> <Link to="/home">Home</Link></li>
            <li className="leading-normal text-lg"><Link to="/contact">Contact</Link></li>
            <li className="leading-normal text-lg"><Link to="/about">About</Link></li>
            <li className="leading-normal text-lg"><Link to="/account">Account</Link></li>
          </ul>
          <div>

          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
