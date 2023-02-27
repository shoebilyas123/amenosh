import Link from 'next/link';
import React, { FC } from 'react';
import { AiFillMail, AiFillPhone } from 'react-icons/ai';
import { ICommonProps } from '~/interfaces/common';

const footerPageLinks = [
  {
    path: '/',
    title: 'Home',
  },
  {
    path: '/products',
    title: 'Products',
  },
  {
    path: '/about-us',
    title: 'About Us',
  },
  {
    path: '/contact',
    title: 'Contact Us',
  },
];

const socials = [
  { link: 'https://www.instagram.com/amenoshfoods/', title: 'Instagram' },
  { link: 'https://twitter.com/AmenoshFoods', title: 'Twitter' },
  { link: 'https://www.linkedin.com/company/amenosh/', title: 'LinkedIn' },
  {
    link: 'https://www.facebook.com/profile.php?id=100090047241883',
    title: 'Facebook',
  },
  { link: 'https://in.pinterest.com/amenoshfoods/', title: 'Pinterest' },
  { link: 'https://www.youtube.com/@amenoshfoods', title: 'YouTube' },
];

const Footer: FC<ICommonProps> = ({
  config: {
    appSettings: { colors },
  },
}) => {
  return (
    <>
      <div
        className="w-[100vw] relative overflow-hidden text-white bg-black pb-12"
        style={{
          background: colors.primary,
        }}
      >
        <div className="w-full grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-1 md:place-content-start md:place-items-start gap-4 px-24 py-12">
          <div className="flex flex-col items-left space-x-1">
            <h1 className="text-3xl">Contacts</h1>
            {socials.map(({ link, title }) => (
              <a href={link} className="hover:text-sky-300">
                {title}
              </a>
            ))}
            <p className="flex items-center mt-4">
              <AiFillMail /> support@amenosh.com
            </p>
          </div>

          <div className="flex flex-col items-left space-x-1">
            <h1 className="text-3xl">Pages</h1>
            {footerPageLinks.map(({ path, title }) => (
              <Link href={path} className="">
                <p className="flex items-center hover:text-sky-300 hover:translate-x-1  transition-all cursor-pointer">
                  {title}
                </p>
              </Link>
            ))}
          </div>

          <div className="flex flex-col items-left space-x-1">
            <h1 className="text-3xl">Products</h1>
            <Link href="/contact" className="flex items-center">
              <p className="flex items-center hover:text-sky-300 cursor-pointer">
                Clumsy Candy
              </p>
            </Link>
          </div>
        </div>
        <div className="text-xs w-full flex items-center justify-center">
          &copy; 2023 Amenosh. All Rights Reserved.
        </div>
      </div>
    </>
  );
};

export default Footer;
