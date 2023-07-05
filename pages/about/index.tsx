// node_module imports
import React from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { FaHeart } from "react-icons/fa";

// local Imports
import DisplayCarousel from "~/components/molecules/displayCarousel";
import Navbar from "~/components/Navbar";
import { AboutBanner, Footer, SectionContact } from "~/components/section";
import { GetServerSideProps, NextPage } from "next";
import { getProductList } from "~/lib/graphcms";
import { IProductList } from "~/interfaces/product";
import { ICommonProps } from "~/interfaces/common";
import { useConfig } from "~/store";
import DynamicHead from "~/components/Document/DynamicHead";

interface IProps extends ICommonProps {
  productImages: Array<string>;
}

const About: NextPage<IProps> = ({ productImages }) => {
  const {
    config: {
      appSettings: { colors },
      contentControls: { aboutContent, aboutTitle },
      fontControls,
    },
  } = useConfig();

  return (
    <>
      <DynamicHead
        title={"About Amenosh"}
        description={aboutContent.substring(0, 100)}
      />
      <div className="w-screen overflow-hidden">
        <Navbar isFixed={false} />
        {/* <AboutBanner /> */}
        <div className="w-full px-4 sm:px-12 lg:px-48 my-4">
          {/* <div className="w-full flex justify-center">
            <p>Home / </p>
            <p className="text-sky-800">About</p>
          </div> */}

          <div className="flex flex-col md:flex-col lg:flex-col xl:flex-row-reverse mt-8 mb-16 w-full">
            {/* <Fade triggerOnce={true}>
              <Slide direction="left" triggerOnce={true}>
                <h1
                  className={`text-6xl text-center ${
                    fontControls.aboutTitleItalics ? "italic" : ""
                  } text-zinc-900 mb-4`}
                >
                  {aboutTitle}
                </h1>
              </Slide>
            </Fade> */}
            <DisplayCarousel
              imgHeight={550}
              className={`m-0 w-full md:w-full lg:w-[45%] xl:w-[45%]`}
              overlay={{
                isButton: true,
                text: "Our Products",
                url: "/products",
              }}
              images={productImages}
            />
            <div className="w-full md:w-full lg:w-[55%] xl:w-[55%] flex flex-col justify-center items-center space-y-8">
              <Fade triggerOnce={true}>
                <Slide direction="right" triggerOnce={true}>
                  <p
                    className={`${
                      fontControls.aboutContentItalics ? "italic" : ""
                    } text-zinc-700 space-y-4 `}
                  >
                    {aboutContent
                      .split("\n")
                      .map((str: string, index: number) => (
                        <p
                          key={index}
                          className={`${
                            index === 0
                              ? "font-bold text-xl md:text-2xl lg:text-2xl"
                              : "text-md md:text-xl lg:text-xl  "
                          }
                      text-zinc-700 space-y-4 text-left border-l-4 border-${
                        colors.secondary
                      } pl-4  
                      `}
                        >
                          {str}
                        </p>
                      ))}
                  </p>
                </Slide>
              </Fade>
            </div>
          </div>
        </div>
        {/* <SectionContact showWave={true} waveColor={colors.secondary} /> */}
        <Footer />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const products: any = await getProductList({});

  const images = products.map((prod: IProductList) => prod.images[0]);
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: {
      productImages: images,
    },
  };
};

export default About;
