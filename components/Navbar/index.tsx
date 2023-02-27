import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useViewportScroll, motion, motionValue } from 'framer-motion';
import { NextPage } from 'next';
import { IoCallSharp, IoHomeOutline } from 'react-icons/io5';
import { BsFillInfoCircleFill, BsFillCartFill } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';

import AmenoshLogoSVG from './../../assets/images/amenoshlogo.png';
import useToggler from '~/hooks/useToggler';
import useLoading from '~/hooks/useLoading';
import LoadingPage from '../animations/LoadingPage';
import { ICommonProps } from '~/interfaces/common';
import FadeSlide from '../animations/FadeSlide';

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

interface IProps extends ICommonProps {
  textColor?: 'DARK' | 'LIGHT';
  isFixed?: boolean;
}

let server = typeof window === 'undefined';

const Navbar: NextPage<IProps> = ({
  textColor = 'DARK',
  isFixed = true,
  config,
}) => {
  const {
    appSettings: { colors },
  } = config;
  const { scrollYProgress } = useViewportScroll();
  const url = typeof window !== 'undefined' && window.URL;
  const [opacityState, setOpacityState] = React.useState(0);
  const { close, isOpen, open } = useToggler();
  const { loading, startloading, stoploading } = useLoading();
  const [windowDimensions, setWindowDimensions] = useState({
    width: !server && window.innerWidth,
    height: !server && window.innerWidth,
  });

  let timeout: any = null;
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

  useEffect(() => {
    if (!loading) {
      startloading();
      timeout = setTimeout(() => {
        stoploading();
      }, 500);
    } else stoploading();

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {loading && <LoadingPage config={config} />}
      <div
        className={`${
          isFixed ? 'fixed' : ''
        } z-50 w-screen flex  justify-between items-stretch h-16 `}
        style={{
          background: colors.navbarColor,
        }}
      >
        <div
          className={`${
            isFixed ? 'fixed' : ''
          } z-50 flex w-screen h-16 border-b-[1px] lg:border-0 justify-center items-stretch md:pr-12 sm:pr-2`}
        >
          <div className="flex gap-1 sm:gap-4 items-stretch sm:mr-12 mr-4 ">
            {windowDimensions.width > 640 &&
              navItems.slice(0, 2).map((item) => (
                <Link href={item.path} key={item.name}>
                  <div className="flex items-center" onClick={startloading}>
                    <FadeSlide slideDirection="right" triggerOnce={false}>
                      <a
                        className={`text-white text-lg px-1 hover:text-blue-400 hover:scale-125  transition-all cursor-pointer`}
                        style={{
                          fontFamily: 'Mallow',
                        }}
                      >
                        {item.name}
                      </a>
                    </FadeSlide>
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
            {windowDimensions.width > 640 &&
              navItems.slice(2, 4).map((item) => (
                <Link href={item.path} key={item.name}>
                  <div className="flex items-center" onClick={startloading}>
                    <FadeSlide slideDirection="left" triggerOnce={false}>
                      <a
                        className={`text-white text-lg px-1 hover:text-blue-400 hover:scale-125  transition-all cursor-pointer`}
                        style={{ fontFamily: 'Mallow' }}
                      >
                        {item.name}
                      </a>
                    </FadeSlide>
                  </div>
                </Link>
              ))}

            {windowDimensions.width < 640 && (
              <div
                className={`flex items-center justify-end cursor-pointer`}
                onClick={isOpen ? close : open}
              >
                <GiHamburgerMenu className={'text-4xl text-white'} />
              </div>
            )}
          </div>
        </div>
      </div>
      {windowDimensions.width < 640 && isOpen && (
        <div
          className="absolute flex flex-col w-screen h-fit left-0"
          style={{ background: colors.navbarColor, zIndex: '999999' }}
        >
          {navItems.map((item) => (
            <Link href={item.path} key={item.name}>
              <div className="flex px-4 py-2 items-center">
                <a
                  className={`text-white text-lg px-1 hover:text-blue-400 hover:scale-125  transition-all cursor-pointer`}
                >
                  {item.name}
                </a>
              </div>
            </Link>
          ))}{' '}
        </div>
      )}
    </>
  );
};

export default Navbar;
