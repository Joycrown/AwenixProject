import { useState } from "react";
import { Link } from "react-router-dom";
import { VscSend } from "react-icons/vsc";
// import { footerqrimg, appstore, playstorebtn } from "../assets";
// import { RiFacebookLine } from "react-icons/ri";
// import { SlSocialTwitter } from "react-icons/sl";
// import { FaInstagram } from "react-icons/fa";
// import { RiLinkedinLine } from "react-icons/ri";
import { useAuthContext } from "../utils/authContext";

function Footer() {
  const [email, setEmail] = useState("");
  const { user } = useAuthContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    console.log(email);
  };

  return (
    <footer className="flex flex-col bg-default-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:flex justify-between text-default-800 max-w-[1200px] w-[95%] mx-auto py-16">
        <div className="flex flex-col max-md:items-center">
          <h3 className="text-2xl font-bold py-3">Awenix AgroAllied Services</h3>
          <p className="py-3">Subscribe</p>
          <form className="relative py-3 flex items-center max-w-64 md:max-w-60">
            <input
              className="bg-default-100 w-full border-default-800 border-2 placeholder:text-default-300 py-2 pl-3 pr-10 outline-none rounded"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
            />
            <VscSend className="text-2xl absolute right-3 cursor-pointer" />
          </form>
        </div>

        <div className="flex flex-col max-md:items-center">
          <h3 className="text-2xl py-2">Contact Us </h3>
          <address className="break-words leading-2 py-3">
            Plot 4 along Ologuneru, Eruwa road,
            <br /> Akufo Farm Settlement
          </address>
          <a
            href="mailto: awenixnigerialimited@gmail.com"
            className="underline-none py-3"
          >
            awenixagroalliedservices@gmail.com
          </a>
          <a href="tel: +234 805 515 1903" className="underline-none py-3">
            +234 805 515 1903
          </a>
          <a href="tel: +234 903 663 9178" className="underline-none py-3">
            +234 903 663 9178
          </a>
        </div>

        <div className="flex flex-col max-md:items-center">
          <h3 className="text-2xl py-2">Account</h3>
          <div className="flex flex-col gap-2">
            <Link to={user.isLogged ? "/account/home" : "/account/register"}>
              My Account
            </Link>
            <Link to="/account/login" className="w-fit">
              Login Account
            </Link>
            <Link to="/account/register" className="w-fit">
              Create Account
            </Link>
            <Link to={user.isLogged ? "/account/home" : "/account/register"}>
              Shop
            </Link>
          </div>
        </div>

        <div className="flex flex-col max-md:items-center">
          <h3 className="text-2xl py-2">Quick Links</h3>
          <div className="flex flex-col gap-2">
            {/* <Link to="">Privacy Policy</Link>
            <Link to="">Terms of Use</Link>
            <Link to="">FAQ</Link> */}
            <Link to="/about">About</Link>
            <Link to="/contact-us">Contact</Link>
          </div>
          {/* <div className="flex gap-12 text-2xl max-md:w-4/5 md:w-full mt-10 ">
            <Link to="">
              <RiFacebookLine />
            </Link>
            <Link to="">
              <SlSocialTwitter />
            </Link>
            <Link to="">
              <FaInstagram />
            </Link>
            <Link to="">
              <RiLinkedinLine />
            </Link>
          </div> */}
        </div>

        {/* <div className="flex flex-col max-md:items-center">
          <h3 className="text-2xl py-2">Download App</h3>
          <p className="">Save $3 with App New Users Only</p>

          <div className="flex p-2 gap-3 pt-3 max-md:items-center">
            <div className="w-1/2">
              <img
                className="w-auto h-auto bg-default-800"
                src={footerqrimg}
                alt="QR Image"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <button className="flex items-center justify-center h-1/2 border-none bg-transparent outline-none">
                <img
                  className="h-full w-full"
                  src={playstorebtn}
                  alt="Play Store button"
                />
              </button>
              <button className="flex items-center justify-center h-1/2 border-none bg-transparent outline-none">
                <img
                  className="h-full w-full"
                  src={appstore}
                  alt="App Store button"
                />
              </button>
            </div>
          </div>

          
        </div> */}
      </div>

      <div className="w-full text-center">
        <hr className="w-full bg-default-700 border-1" />
        <p className="text-default-800 text-xs p-3">
          &copy; Copyright Awenix 2025. All rights reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
