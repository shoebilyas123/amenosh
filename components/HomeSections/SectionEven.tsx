import React, { useEffect } from 'react';
import { motion, m, useViewportScroll } from 'framer-motion';
import { ParallaxBanner } from 'react-scroll-parallax';
import { Fade, Slide } from 'react-awesome-reveal';
import { useMediaQuery } from 'react-responsive';
import { ISectionProps } from '~/interfaces/section';

export const SectionEvenSm = ({
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
          speed: -20,
        },
        {
          children: (
            <div className="flex flex-col items-start h-screen w-screen bg-black bg-opacity-40">
              <Slide direction="right" className="ml-auto mt-16  mr-6 w-52">
                <h1 className="text-7xl text-white  leading-tight   text-right ">
                  {heading}
                </h1>
              </Slide>
              <Fade className="mx-auto mt-auto mb-20">
                <div className="group  text-gray-400 p-3 text-lg max-w-sm text-justify bg-black bg-opacity-40">
                  <div className="m-3 group-hover:scale-110 transition-all border-[1px] border-gray-400 p-3">
                    {typeof content === 'string' ||
                    React.isValidElement(content)
                      ? content
                      : ''}
                  </div>
                </div>
              </Fade>
            </div>
          ),
        },
      ]}
      className=" h-screen w-screen bg-cover "
    />
  );
};

export const SectionEvenLg = ({
  background,
  heading,
  content,
  fallbackColor,
  showBG,
  className = '',
}: ISectionProps) => {
  return (
    <div
      className={`w-full h-screen flex ${className}`}
      style={{ backgroundColor: fallbackColor }}
    >
      {showBG && (
        <ParallaxBanner
          layers={[
            {
              image: background,
              speed: 20,
            },
          ]}
        />
      )}
      <div className="w-full flex  ml-8">
        <div className="flex flex-col justify-center text-center mx-auto">
          <Fade triggerOnce>
            <Slide direction="down">
              <h1 className="text-5xl text-white">{heading}</h1>
            </Slide>
          </Fade>
          <Fade triggerOnce>
            <Slide direction="up">
              {React.isValidElement(content) ? (
                content
              ) : typeof content === 'string' ? (
                <p className="text-gray-300 max-w-md text-lg  my-12">
                  {' '}
                  {content}
                </p>
              ) : (
                ''
              )}
            </Slide>
          </Fade>
        </div>
      </div>
    </div>
  );
};

const EvenSection = (props: ISectionProps) => {
  // if mobile or tablet
  const isMobileOrTablet = useMediaQuery({ query: '(max-width: 1024px)' });
  return isMobileOrTablet ? (
    <SectionEvenSm {...props} />
  ) : (
    <SectionEvenLg {...props} />
  );
};

export default EvenSection;
