import React from 'react';
import Link from 'next/link';
import { useViewportScroll, motion, motionValue } from 'framer-motion';
import { NextPage } from 'next';
import Image from 'next/image';

import AmenoshLogoSVG from './../../assets/images/amenoshlogo.png';

const navItems = [
  {
    name: 'Products',
    path: '/products',
  },
  {
    name: 'About',
    path: '/about',
  },
  {
    name: 'Contact',
    path: '/contact',
  },
];

interface IProps {
  textColor?: 'DARK' | 'LIGHT';
  isFixed?: boolean;
}

const Navbar: NextPage<IProps> = ({ textColor = 'DARK', isFixed = true }) => {
  const { scrollYProgress } = useViewportScroll();
  const [opacityState, setOpacityState] = React.useState(0);
  scrollYProgress.onChange((value) => {
    value = parseFloat(value.toFixed(3));

    if (opacityState === Math.min(value, 0.2) * 4.2) return;
    setOpacityState(Math.min(value, 0.2) * 4.2);
  });

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
        } z-50 flex w-screen h-16 border-b-[1px] lg:border-0 justify-between items-stretch md:pr-12 sm:pr-2`}
      >
        <div className="flex items-center overflow-hidden">
          <Link href="/">
            {/* <h1
              className={`text-4xl ${
                textColor === 'DARK' ? 'text-white' : 'text-rose-800'
              } px-2 sm:px-12 cursor-pointer`}
            >
              AMENOSH
            </h1> */}
            <img
              src={`https://media.graphassets.com/KKiLmvRQTuOpkSaMBLq8`}
              width={275}
              height={125}
            />
          </Link>
        </div>
        <div className="flex gap-1 sm:gap-4 items-stretch sm:mr-12 mr-4 ">
          {navItems.map((item) => (
            <Link href={item.path} key={item.name}>
              <div className="flex items-center">
                <a
                  className={`text-white text-lg px-1 hover:text-blue-400 hover:scale-125  transition-all cursor-pointer`}
                >
                  {item.name}
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
