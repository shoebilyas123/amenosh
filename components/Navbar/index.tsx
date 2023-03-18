import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useViewportScroll } from 'framer-motion';
import { NextPage } from 'next';
import { IoCallSharp, IoHomeOutline } from 'react-icons/io5';
import { BsFillInfoCircleFill, BsFillCartFill } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { HiMenu } from 'react-icons/hi';

import useToggler from '~/hooks/useToggler';
import { ICommonProps } from '~/interfaces/common';
import FadeSlide from '../animations/FadeSlide';
import { useConfig } from '~/store';
import { Fade } from 'react-awesome-reveal';
import FullScreenMenu from './FullScreenMenu';
import Hamburger from '../animations/Hamburger';

export const navItems = [
  {
    name: 'Products',
    path: '/products',
    icon: BsFillCartFill,
  },
  {
    name: 'Home',
    path: '/',
    icon: IoHomeOutline,
  },
  {
    name: 'About',
    path: '/about',
    icon: BsFillInfoCircleFill,
  },
  {
    name: 'Contact',
    path: '/contact',
    icon: IoCallSharp,
  },
];

interface IProps extends ICommonProps {
  textColor?: 'DARK' | 'LIGHT';
  isFixed?: boolean;
}

let server = typeof window === 'undefined';

const Navbar: NextPage<IProps> = ({ textColor = 'DARK', isFixed = true }) => {
  const { scrollYProgress } = useViewportScroll();
  const { config } = useConfig();
  const [opacityState, setOpacityState] = React.useState(0);
  const { close, isOpen, open } = useToggler();
  const [windowDimensions, setWindowDimensions] = useState({
    width: !server && window.innerWidth,
    height: !server && window.innerWidth,
  });

  scrollYProgress.onChange((value) => {
    value = parseFloat(value.toFixed(3));

    if (opacityState === Math.min(value, 0.2) * 4.2) return;
    setOpacityState(Math.min(value, 0.2) * 4.2);
  });

  const getWindowDimensions = () => {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerWidth,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', getWindowDimensions);
  }, []);

  return (
    <>
      <div
        className={`${
          isFixed ? 'fixed' : ''
        } z-50 w-screen overflow-hidden flex  justify-between items-stretch h-24 `}
        style={{
          background: config.appSettings?.colors.navbarColor,
        }}
      >
        <div
          className={`${
            isFixed ? 'fixed' : ''
          } z-50 flex w-[100%] overflow-hidden h-24 lg:border-0 justify-center items-stretch md:pr-12 sm:pr-2`}
        >
          <div className="flex justify-center gap-2 sm:gap-6 md:gap-12 lg:gap-24 items-center ">
            {windowDimensions.width > 640 &&
              navItems.slice(0, 2).map((item) => (
                <div className="flex items-center">
                  <FadeSlide slideDirection="right" triggerOnce={false}>
                    <Link href={item.path}>
                      <p
                        className={`text-white text-2xl px-1 hover:${
                          ['#fff', '#ffffff'].some(
                            (clr) =>
                              clr ===
                              config.appSettings?.colors.navbarColor.toLowerCase()
                          )
                            ? 'text-white'
                            : 'text-neutral-900'
                        } hover:scale-125  transition-all cursor-pointer`}
                        style={{
                          fontFamily: "'Lobster', cursive",
                        }}
                      >
                        {item.name}
                      </p>
                    </Link>
                  </FadeSlide>
                </div>
              ))}
            <div className="flex items-center cursor-pointer overflow-hidden">
              <Link href="/">
                <img
                  src={`https://media.graphassets.com/rcQl0lwKQM6YISxmkZRN`}
                  width={275}
                  height={125}
                />
              </Link>
            </div>
            {windowDimensions.width > 640 &&
              navItems.slice(2, 4).map((item) => (
                <div className="flex items-center" key={item.name}>
                  <FadeSlide slideDirection="left" triggerOnce={false}>
                    <Link href={item.path}>
                      <p
                        className={`text-white text-2xl px-1  hover:${
                          ['#fff', '#ffffff'].some(
                            (clr) =>
                              clr ===
                              config.appSettings?.colors.navbarColor.toLowerCase()
                          )
                            ? 'text-white'
                            : 'text-neutral-900'
                        }  hover:scale-125  transition-all cursor-pointer`}
                        style={{ fontFamily: " 'Lobster', cursive" }}
                      >
                        {item.name}
                      </p>
                    </Link>
                  </FadeSlide>
                </div>
              ))}

            {windowDimensions.width < 640 && (
              // <div
              //   className={`flex items-center justify-end cursor-pointer`}
              //   onClick={isOpen ? close : open}
              // >
              //   <GiHamburgerMenu className={'text-4xl text-white'} />
              // </div>
              <HiMenu
                size={48}
                color="white"
                onClick={isOpen ? close : open}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
      {windowDimensions.width < 640 && isOpen && (
        <FullScreenMenu onClick={close} />
      )}
    </>
  );
};

export default Navbar;
