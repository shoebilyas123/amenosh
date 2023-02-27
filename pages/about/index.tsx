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

interface IProps extends ICommonProps {
  productImages: Array<string>;
}

const About: NextPage<IProps> = ({ productImages, config }) => {
  const {
    appSettings: { colors },
  } = config;
  return (
    <div className="w-screen overflow-hidden">
      <Navbar config={config} isFixed={false} />
      {/* <AboutBanner /> */}
      <div className="w-full px-4 sm:px-12 lg:px-48 my-4">
        <div className="w-full flex justify-center">
          <p>Home / </p>
          <p className="text-sky-800">About</p>
        </div>

        <div className="flex flex-col sm:flex-row items-start justify-around mt-8 w-full  ">
          <div className="flex flex-col items-start w-[100%] sm:w-[45%]">
            <Fade triggerOnce={true}>
              <Slide direction="left" triggerOnce={true}>
                <h1 className="text-6xl text-zinc-900 mb-4">Amenosh</h1>
              </Slide>
            </Fade>
            <Fade triggerOnce={true}>
              <Slide direction="right" triggerOnce={true}>
                <p className="text-zinc-700">
                  <p>
                    AMENOSH is a food startup brand recently launched in
                    February 2023. We aim to launch high quality innovative{' '}
                    <span className="text-green-700 font-bold">
                      MADE IN INDIA
                    </span>{' '}
                    food products under multiple sub-brands in near future. Our
                    aim is to delight the modern day consumer whose culinary
                    preferences are unique combinations of ethnic and
                    cosmopolitan, and whose palate is constantly evolving
                    seeking variety and indulgence.
                  </p>
                  <br />
                  <p>
                    Clumsy candy is an in-house brand of AMENOSH with
                    sugar-boiled candies in six unique flavors so delicious that
                    they leave you craving for more.
                  </p>
                  <br />
                  <p>
                    Clumsy candies are made with the choicest ingredients to WOW
                    our customers.
                    <FaHeart className="text-rose-800" />
                  </p>
                  <br />
                  <p>
                    We use fruit powders and active ingredients in all our
                    candies. In some of our candies, such as Lemon-Mint and
                    Ginger, we have even eliminated artificial colors and
                    flavors (and used Natural colors and Natural flavors
                    instead) to make them more safe for consumption.`
                  </p>
                </p>
              </Slide>
            </Fade>
          </div>
          <DisplayCarousel
            config={config}
            imgHeight={550}
            className={`m-0 w-[90vw] sm:w-[55%] md:w-[55%] sm:h-[550px] h-[250px]`}
            overlay={{
              isButton: true,
              text: 'Our Products',
              url: '/products',
            }}
            images={productImages}
          />
        </div>
        {/* <div
          id="about-display-cards"
          className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 items-center space-x-2 my-24"
        >
          {aboutCards.map(({ title, content }, index: number) => (
            <Card
              shadowSize="lg"
              style={{
                background: '#b4c7d9',
              }}
              className="w-100 text-zinc-600 px-2 py-8 flex-col items-center justify-center"
            >
              <Fade cascade damping={0.2}>
                <h1 className="text-6xl font-bold text-zinc-900">{title}</h1>

                <Slide direction={index % 2 === 0 ? 'down' : 'up'}>
                  <p className="p-10">{content}</p>
                </Slide>
              </Fade>
            </Card>
          ))}
        </div> */}
      </div>
      <SectionContact
        config={config}
        showWave={true}
        waveColor={colors.secondary}
      />
      <Footer config={config} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const products: any = await getProductList({});

  console.log({ products });
  const images = products.map((prod: IProductList) => prod.images[0]);

  return {
    props: {
      productImages: images,
    },
  };
};

export default About;
