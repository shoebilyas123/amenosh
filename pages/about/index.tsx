// node_module imports
import React from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import { FaHeart } from 'react-icons/fa';

// local Imports
import Card from '~/components/card';
import DisplayCarousel from '~/components/molecules/displayCarousel';
import Navbar from '~/components/Navbar';
import { AboutBanner, Footer, SectionContact } from '~/components/section';
import { aboutCards } from 'constants/about';
import { GetServerSideProps, NextPage } from 'next';
import { getProductList } from '~/lib/graphcms';
import { IProductList } from '~/interfaces/product';
import { ICommonProps } from '~/interfaces/common';
import { useConfig } from '~/store';
import DynamicHead from '~/components/Document/DynamicHead';

interface IProps extends ICommonProps {
  productImages: Array<string>;
}

const About: NextPage<IProps> = ({ productImages }) => {
  const {
    config: {
      appSettings: { colors },
      contentControls: { aboutContent, aboutTitle },
    },
  } = useConfig();

  return (
    <>
      <DynamicHead
        title={'About Amenosh'}
        description={aboutContent.substring(0, 100)}
      />
      <div className="w-screen overflow-hidden">
        <Navbar isFixed={false} />
        {/* <AboutBanner /> */}
        <div className="w-full px-4 sm:px-12 lg:px-48 my-4">
          <div className="w-full flex justify-center">
            <p>Home / </p>
            <p className="text-sky-800">About</p>
          </div>

          <div className="flex flex-col-reverse lg:flex-row items-start justify-around mt-8 mb-16 w-full  ">
            <div className="flex flex-col items-start w-[100%] lg:w-[55%]">
              <Fade triggerOnce={true}>
                <Slide direction="left" triggerOnce={true}>
                  <h1
                    className="text-6xl text-zinc-900 mb-4"
                    style={{
                      fontFamily: "'Garamound', serif",
                    }}
                  >
                    {aboutTitle}
                  </h1>
                </Slide>
              </Fade>
              <Fade triggerOnce={true}>
                <Slide direction="right" triggerOnce={true}>
                  <p
                    className="text-zinc-700 space-y-4 text-left text-xl"
                    style={{
                      fontFamily: "'Garamound', serif",
                    }}
                  >
                    {aboutContent.split('\n').map((str: string) => (
                      <>
                        <p>{str}</p>
                      </>
                    ))}
                  </p>
                </Slide>
              </Fade>
            </div>
            <DisplayCarousel
              imgHeight={550}
              className={`m-0 w-[90vw] md:w-[80vw] lg:w-[45%]  sm:h-[550px] h-[350px]`}
              overlay={{
                isButton: true,
                text: 'Our Products',
                url: '/products',
              }}
              images={productImages}
            />
          </div>
        </div>
        <SectionContact showWave={true} waveColor={colors.secondary} />
        <Footer />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const products: any = await getProductList({});

  const images = products.map((prod: IProductList) => prod.images[0]);
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  return {
    props: {
      productImages: images,
    },
  };
};

export default About;
