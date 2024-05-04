import { useState } from 'react';
import { Link } from 'react-router-dom'
import { VscSend } from "react-icons/vsc";
import { footerqrimg, appstore, playstorebtn } from '../assets';
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { IoLogoApple } from "react-icons/io5";
import { RiFacebookLine } from "react-icons/ri";
import { SlSocialTwitter } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa";
import { RiLinkedinLine } from "react-icons/ri";

function Footer() {
  const [email, setEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    console.log(email);
  };

  return (
    <footer className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 md:pl-9 gap-9 lg:flex justify-center bg-default-100">
        <div className="flex flex-col py-14 max-md:items-center">
          <h3 className="text-default-800 text-2xl font-bold py-3">Awenix Farm Nigeria</h3>
          <p className="text-default-800 text-base py-3">Subscribe</p>
          <span className="text-default-800 text-base py-2">Get 10% off your first order</span>
          <form className="relative py-3">
            <input className="bg-default-100 max-md:w-full border-default-800 border-2 placeholder:text-default-300 placeholder:px-1 p-2 outline-none text-default-800 rounded w-4/5" type="email" placeholder="Enter your email" value={email} onChange={handleChange} />
            <VscSend className="text-2xl text-default-800 absolute max-md:right-[1rem] top-5 right-[4.8rem] max-lg:right-[6rem] cursor-pointer hover:text-default-800" />
          </form>
        </div>

        <div className="flex flex-col py-14 max-md:items-center">
          <h3 className="text-default-800 text-2xl py-2">Contact Us </h3>
          <p className="text-default-800 text-base break-words leading-2 py-3">111 Bijoy Sarani, Dhaka,<br /> DH 1515, Bangladesh</p>
          <p className="text-default-800 text-base py-3">awenixltd@gmail.com</p>
          <p className="text-default-800">+88015-88888-9999</p>
        </div>

        <div className="flex flex-col  py-14  max-md:items-center">
          <h3 className="text-default-800 text-2xl py-2">Account</h3>
          <Link to="" className="text-default-800 text-base py-2">My Account</Link>
          <Link to="" className="text-default-800 text-base py-2">Login / Register</Link>
          <Link to="" className="text-default-800 text-base py-2">Cart</Link>
          <Link to="" className="text-default-800 text-base py-2">Wishlist</Link>
          <Link to="" className="text-default-800 text-base py-2">Shop</Link>
        </div>

        <div className="flex flex-col py-14  max-md:items-center">
          <h3 className="text-default-800 text-2xl py-2">Quick Links</h3>
          <Link to="" className="text-default-800 text-base py-2">Privacy Policy</Link>
          <Link to="" className="text-default-800 text-base py-2">Terms of Use</Link>
          <Link to="" className="text-default-800 text-base py-2">FAQ</Link>
          <Link to="" className="text-default-800 text-base py-2">Contact</Link>
        </div>

        <div className="flex flex-col py-14 max-md:items-center">
          <h3 className="text-default-800 text-2xl py-2">Download App</h3>
          <p className="text-default-800">Save $3 with App New Users Only</p>

          <div className="flex p-2 gap-3 pt-3  max-md:items-center">
            <div className="w-1/2">
              <img className="w-auto  h-auto bg-default-800" src={footerqrimg} alt="QR Image" />
            </div>
            <div className="flex flex-col w-1/2">
  <button className="flex items-center justify-center h-1/2 border-none bg-transparent outline-none">
    <img className="h-full w-full" src={playstorebtn} alt="Play Store button"/>
  </button>
  <button className="flex items-center justify-center h-1/2 border-none bg-transparent outline-none">
    <img className="h-full w-full" src={appstore} alt="App Store button"/>
  </button>
</div>

          </div>
          <div className="flex justify-between max-md:w-4/5 md:w-full">
            <Link to=""><RiFacebookLine className="text-default-800 text-4xl rounded" /></Link>
            <Link to=""><SlSocialTwitter className="text-default-800 text-4xl rounded" /></Link>
            <Link to=""><FaInstagram className="text-default-800 text-4xl rounded" /></Link>
            <Link to=""><RiLinkedinLine className="text-default-800 text-4xl rounded" /></Link>




          </div>

        </div>
      </div>
      <div className="w-full text-center  bg-default-100">
      <hr className="w-full bg-default-700 border-1"/>
      <p className="text-default-700 p-3">&copy; Copyright Awenix 2024. All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
