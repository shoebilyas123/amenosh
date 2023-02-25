import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useViewportScroll, motion, motionValue } from 'framer-motion';
import { NextPage } from 'next';
import { IoCallSharp, IoHomeOutline } from 'react-icons/io5';
import { BsFillInfoCircleFill, BsFillCartFill } from 'react-icons/bs';

import AmenoshLogoSVG from './../../assets/images/amenoshlogo.png';

const navItems = [
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

interface IProps {
  textColor?: 'DARK' | 'LIGHT';
  isFixed?: boolean;
}

let server = typeof window === 'undefined';

const Navbar: NextPage<IProps> = ({ textColor = 'DARK', isFixed = true }) => {
  const { scrollYProgress } = useViewportScroll();
  const [opacityState, setOpacityState] = React.useState(0);
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
    <div
      className={`${
        isFixed ? 'fixed' : ''
      } z-50 w-screen flex  justify-between items-stretch h-16 `}
      style={{
        background: `#0c243c`,
      }}
    >
      <div
        className={`${
          isFixed ? 'fixed' : ''
        } z-50 flex w-screen h-16 border-b-[1px] lg:border-0 justify-center items-stretch md:pr-12 sm:pr-2`}
      >
        <div className="flex gap-1 sm:gap-4 items-stretch sm:mr-12 mr-4 ">
          {navItems.slice(0, 2).map((item) => (
            <Link href={item.path} key={item.name}>
              <div className="flex items-center">
                <a
                  className={`text-white text-lg px-1 hover:text-blue-400 hover:scale-125  transition-all cursor-pointer`}
                >
                  {windowDimensions.width < 450 ? <item.icon /> : item.name}
                </a>
              </div>
            </Link>
          ))}
          <div className="flex items-center overflow-hidden">
            <Link href="/">
              <img
                src={`https://media.graphassets.com/rcQl0lwKQM6YISxmkZRN`}
                width={275}
                height={125}
              />
            </Link>
          </div>
          {navItems.slice(2, 4).map((item) => (
            <Link href={item.path} key={item.name}>
              <div className="flex items-center">
                <a
                  className={`text-white text-lg px-1 hover:text-blue-400 hover:scale-125  transition-all cursor-pointer`}
                >
                  {windowDimensions.width < 450 ? <item.icon /> : item.name}
                </a>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
