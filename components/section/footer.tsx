import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { AiFillMail, AiFillPhone, AiOutlineAmazon } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import Wave from "react-wavify";
import { footerPageLinks, socials } from "~/constants/footer";
import { ICommonProps } from "~/interfaces/common";
import { useConfig } from "~/store";
import { H1 } from "../atoms/headings";

const Footer: FC<ICommonProps> = ({}) => {
  const { config } = useConfig();
  const {
    contentControls: { email, address, phone },
    marketplaces,
  } = config;

 

  return (
    <>
      <Wave
        fill={config.appSettings?.colors.footerColor}
        options={{
          height: 30,
          amplitude: 30,
          speed: 0.4,
          points: 3,
        }}
        className="w-full -mb-4"
      />
      <div
        className={`w-screen relative overflow-hidden pb-12
        ${
          ["#fff", "#ffffff"].some(
            (clr) =>
              clr === config.appSettings?.colors.footerColor.toLowerCase()
          )
            ? "text-neutral-900"
            : "text-white"
        }
        `}
        style={{
          background: config.appSettings?.colors.footerColor,
          // background: '#100152',
        }}
      >
        <div className="w-full grid md:grid-cols-2 md:gap-y-12 gap-y-auto lg:grid-cols-4 sm:grid-cols-1 md:place-content-start md:place-items-start gap-4 px-24 py-12">
          <div className="flex flex-col items-left space-y-4">
            <div>
              <h1 className="text-3xl">Follow Us</h1>
              {socials.map(({ link, title, Icon }) => (
                <p className="flex items-center">
                  <Icon />
                  <a
                    href={link}
                    target="_blank"
                    className={` hover:text-blue-300 transition-all`}
                  >
                    {title}
                  </a>
                </p>
              ))}
            </div>
            <div className="flex flex-col items-start space-y-2">
              <p className="flex items-center space-x-2">
                <AiFillMail /> <span>{email}</span>
              </p>
              <p className="flex items-center space-x-2">
                <BsFillTelephoneFill /> <span>{phone}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col items-left space-y-4">
            <div>
              <h1 className="text-3xl">Pages</h1>
              {footerPageLinks.map(({ path, title }) => (
                <Link href={path} className="">
                  <p
                    className={`flex items-center hover:text-blue-300 hover:translate-x-1  transition-all cursor-pointer `}
                  >
                    {title}
                  </p>
                </Link>
              ))}
            </div>
            <div>
              <h1 className="text-3xl">Products</h1>
              <Link href="/products" className="flex items-center">
                <p className="flex items-center hover:text-blue-300 cursor-pointer">
                  Clumsy Candy
                </p>
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-left space-y-4">
            <div>
              <H1 className="text-3xl "> Address</H1>
              <p>
                {(address || "").split("\n").map((str: string) => (
                  <p>{str}</p>
                ))}
              </p>
            </div>
            <div>
              <H1 className="text-3xl ">Working Hours</H1>
              <div>
                <p>{config.contentControls.workingHoursDays}</p>
                <p>{config.contentControls.workingHoursTimings}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-left space-x-1 space-y-4">
            <h1 className="text-3xl">Buy Now On</h1>
            {/* <h1></h1> */}
            <div>
              {marketplaces.map(({ name, url }) => (
                <p className="flex items-center hover:text-blue-300 transition-all">
                  <a {...(url ? { href: url } : {})} target="_blank">
                    {name}
                  </a>
                </p>
              ))}
            </div>
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
