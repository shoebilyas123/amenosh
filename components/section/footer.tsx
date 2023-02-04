import Link from 'next/link';
import React from 'react';
import { AiFillMail, AiFillPhone } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="w-[100vw] overflow-hidden bg-rose-900 text-white pb-12">
      <div className="w-full grid grid-cols-4 gap-4 px-24 py-12">
        <div className="flex flex-col items-left space-x-1">
          <h1 className="text-3xl">Contacts</h1>
          <a href="https://www.facebook.com" className="none">
            Facebook
          </a>
          <a href="https://www.facebook.com" className="none">
            Instagram
          </a>
          <a href="https://www.facebook.com" className="none">
            LinkedIn
          </a>
          <p className="flex items-center">
            {' '}
            <AiFillMail /> amenosh@testmail.com
          </p>
          <p className="flex items-center">
            <AiFillPhone /> +91-9988667755
          </p>
        </div>

        <div className="flex flex-col items-left space-x-1">
          <h1 className="text-3xl">Pages</h1>
          <Link href="/" className="">
            <p className="flex items-center hover:text-rose-300 hover:translate-x-1  transition-all cursor-pointer">
              Home
            </p>
          </Link>

          <Link href="/products" className="flex items-center">
            <p className="flex items-center hover:text-rose-300 hover:translate-x-1  transition-all cursor-pointer">
              Products
            </p>
          </Link>

          <Link href="/about" className="flex items-center">
            <p className="flex items-center hover:text-rose-300 hover:translate-x-1  transition-all cursor-pointer">
              About Us
            </p>
          </Link>

          <Link href="/contact" className="flex items-center">
            <p className="flex items-center hover:text-rose-300 hover:translate-x-1  transition-all cursor-pointer">
              Contact Us
            </p>
          </Link>
        </div>

        <div className="flex flex-col items-left space-x-1">
          <h1 className="text-3xl">Products</h1>
          <Link href="/contact" className="flex items-center">
            <p className="flex items-center hover:text-rose-300 cursor-pointer">
              Clumsy Candy
            </p>
          </Link>
        </div>
      </div>
      <div className="text-xs w-full flex items-center justify-center">
        &copy; 2023 Amenosh. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
