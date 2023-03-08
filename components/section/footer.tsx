import Link from 'next/link';
import React, { FC } from 'react';
import { AiFillMail, AiFillPhone } from 'react-icons/ai';
import { footerPageLinks, socials } from '~/constants/footer';
import { ICommonProps } from '~/interfaces/common';
import { useConfig } from '~/store';

const Footer: FC<ICommonProps> = ({}) => {
  const { config } = useConfig();
  return (
    <>
      <div
        className={`w-[100vw] relative overflow-hidden pb-12
        ${
          ['#fff', '#ffffff'].some(
            (clr) =>
              clr === config.appSettings?.colors.footerColor.toLowerCase()
          )
            ? 'text-neutral-900'
            : 'text-white'
        }
        `}
        style={{
          background: config.appSettings?.colors.footerColor,
        }}
      >
        <div className="w-full grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-1 md:place-content-start md:place-items-start gap-4 px-24 py-12">
          <div className="flex flex-col items-left space-y-1">
            <h1 className="text-3xl">Follow Us</h1>
            {socials.map(({ link, title, Icon }) => (
              <p className="flex items-center">
                <Icon />
                <a
                  href={link}
                  target="_blank"
                  className={` hover:text-neutral-900 transition-all`}
                >
                  {title}
                </a>
              </p>
            ))}
            <p className="flex items-center">
              <AiFillMail /> {config.contentControls.email}
            </p>
          </div>

          <div className="flex flex-col items-left space-x-1">
            <h1 className="text-3xl">Pages</h1>
            {footerPageLinks.map(({ path, title }) => (
              <Link href={path} className="">
                <p
                  className={`flex items-center hover:text-neutral-900 hover:translate-x-1  transition-all cursor-pointer `}
                >
                  {title}
                </p>
              </Link>
            ))}
          </div>

          <div className="flex flex-col items-left space-x-1">
            <h1 className="text-3xl">Products</h1>
            <Link href="/products" className="flex items-center">
              <p className="flex items-center hover:text-neutral-900 cursor-pointer">
                Clumsy Candy
              </p>
            </Link>
          </div>
        </div>
        <div className="text-lg w-full flex items-center justify-center">
          &copy;{`2023 Amenosh. All Rights Reserved.`}
        </div>
      </div>
    </>
  );
};

export default Footer;
