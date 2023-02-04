import React, { useEffect } from 'react';
import { motion, m, useViewportScroll } from 'framer-motion';
import { ParallaxBanner } from 'react-scroll-parallax';
import { Slide, Fade, JackInTheBox, Zoom } from 'react-awesome-reveal';
import { useMediaQuery } from 'react-responsive';

import { ISectionProps } from '~/interfaces/section';

export const SectionOddSm = ({
  background,
  heading,
  content,
  fallbackColor,
}: ISectionProps) => {
  return (
    <ParallaxBanner
      layers={[
        {
          image: background,
          speed: 20,
        },
        {
          children: (
            <div className="flex flex-col items-start h-screen w-screen bg-black bg-opacity-40">
              <Slide direction="left" className="w-52 mt-16">
                <h1 className="text-7xl text-white leading-tight px-4 ">
                  {heading}
                </h1>
              </Slide>
              <Fade className="mx-auto mt-auto mb-20">
                <div className="group  text-gray-400 p-3 text-lg max-w-sm text-justify bg-black bg-opacity-40">
                  <div className="m-3 group-hover:scale-110 transition-all border-[1px] border-gray-400 p-3">
                    {React.isValidElement(content) ||
                    typeof content === 'string'
                      ? content
                      : ''}
                  </div>
                </div>
              </Fade>
            </div>
          ),
        },
      ]}
      className=" h-screen w-screen bg-cover"
    />
  );
};
export const SectionOddLg = ({
  background,
  heading,
  content,
  fallbackColor,
  showBG = true,
  className = '',
}: ISectionProps) => {
  return (
    <div
      className={`w-full h-screen flex ${className}`}
      style={{ backgroundColor: fallbackColor }}
    >
      <div className="w-full flex">
        <div className={`flex flex-col justify-center mx-auto`}>
          <Fade triggerOnce>
            <Slide direction="down">
              <h1 className="text-5xl text-white">{heading}</h1>
            </Slide>
          </Fade>
          <Fade triggerOnce>
            <Slide direction="up">
              {typeof content === 'string' ? (
                <p className="text-gray-300 max-w-md text-lg  my-12">
                  {' '}
                  {content}
                </p>
              ) : React.isValidElement(content) ? (
                content
              ) : (
                ''
              )}
            </Slide>
          </Fade>
        </div>
      </div>

      {showBG && (
        <ParallaxBanner
          layers={[
            {
              image: background,
              speed: -20,
            },
          ]}
        />
      )}
    </div>
  );
};
const OddSection = (props: ISectionProps) => {
  const isMobileOrTablet = useMediaQuery({ query: '(max-width: 1024px)' });
  return isMobileOrTablet ? (
    <SectionOddSm {...props} />
  ) : (
    <SectionOddLg {...props} />
  );
};

export default OddSection;
