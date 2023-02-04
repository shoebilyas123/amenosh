import React from 'react';
import Link from 'next/link';
import { useViewportScroll, motion, motionValue } from 'framer-motion';
import { NextPage } from 'next';

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
      } z-50 w-screen flex  justify-between items-stretch h-16 bg-rose-900`}
    >
      <div className="fixed z-50 flex w-screen h-16 border-b-[1px] lg:border-0 justify-between items-stretch md:pr-12 sm:pr-2">
        <div className="flex items-center">
          <Link href="/">
            <h1
              className={`text-4xl ${
                textColor === 'DARK' ? 'text-white' : 'text-rose-800'
              } px-2 sm:px-12 cursor-pointer`}
            >
              AMENOSH
            </h1>
          </Link>
        </div>
        <div className="flex gap-1 sm:gap-4 items-stretch sm:mr-12 mr-4">
          {navItems.map((item) => (
            <Link href={item.path} key={item.name}>
              <div className="flex items-center">
                <a
                  className={`${
                    textColor === 'DARK' ? 'text-white' : 'text-zinc-800'
                  } text-lg px-1 hover:text-rose-500 hover:scale-105  cursor-pointer`}
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
