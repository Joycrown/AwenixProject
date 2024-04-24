import { Link } from "react-router-dom";
import { logo } from "../assets";

function Header() {
  return (
    <div className="flex">
      <Link to="/">
        <img src={logo} alt="Awenix" />
      </Link>
      Header
    </div>
  );
}

export default Header;
