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
import Link from "next/link";

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

  const content = aboutContent.split("\n");
  const images = productImages?.map((img) => {
    return {
      url: img,
      alt: "Amenosh",
    };
  });

  return (
    <>
      <DynamicHead
        title={"About Amenosh"}
        description={aboutContent.substring(0, 100)}
      />
      <div className="w-screen overflow-hidden">
        <Navbar isFixed={false} />
        {/* <AboutBanner /> */}
        {/* <div className="w-full px-4 sm:px-12 lg:px-48 my-4">
          {/* <div className="w-full flex justify-center">
            <p>Home / </p>
            <p className="text-sky-800">About</p>
          </div> 

          <div className="flex flex-col md:flex-col lg:flex-col xl:flex-row-reverse mt-8 mb-16 w-full">
          */}
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
            </Fade>
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
                      */}
        <div className="bg-white">
          <main className="isolate">
            {/* Hero section */}
            <div className="relative isolate -z-10">
              <svg
                className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                    width={200}
                    height={200}
                    x="50%"
                    y={-1}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M.5 200V.5H200" fill="none" />
                  </pattern>
                </defs>
                <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                  <path
                    d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                    strokeWidth={0}
                  />
                </svg>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                  fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
                />
              </svg>
              <div
                className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
                aria-hidden="true"
              >
                <div
                  className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                  style={{
                    clipPath:
                      "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
                  }}
                />
              </div>
              <div className="overflow-hidden">
                <div className="mx-auto max-w-7xl px-6 pb-32 pt-4 sm:pt-60 lg:px-8 lg:pt-8">
                  <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                    <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        {aboutTitle}
                      </h1>
                      <p className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                        {content?.[0]}
                      </p>
                    </div>
                    <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                      <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                        <div className="relative">
                          <Link href="/products">
                            <img
                              src={images?.[0].url}
                              alt={images?.[0].alt}
                              className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-contain shadow-lg"
                            />
                          </Link>
                          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                        </div>
                      </div>
                      <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                        <div className="relative">
                          <Link href="/products">
                            <img
                              src={images?.[1].url}
                              alt={images?.[1].alt}
                              className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-contain shadow-lg"
                            />
                          </Link>
                          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                        </div>
                        <div className="relative">
                          <Link href="/products">
                            <img
                              src={images?.[2].url}
                              alt={images?.[2].alt}
                              className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-contain shadow-lg"
                            />
                          </Link>
                          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                        </div>
                      </div>
                      <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                        <div className="relative">
                          <Link href="/products">
                            <img
                              src={images?.[3].url}
                              alt={images?.[3].alt}
                              className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-contain shadow-lg"
                            />
                          </Link>
                          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                        </div>
                        <div className="relative">
                          <Link href="/products">
                            <img
                              src={images?.[4].url}
                              alt={images?.[4].alt}
                              className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-contain shadow-lg"
                            />
                          </Link>
                          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div className="flex flex-col px-6 gap-8 max-w-2xl lg:max-w-7xl lg:px-8 md:max-w-5xl mx-auto mdflex-row lg:flex-row mb-16  ">
          {content?.slice(1).map((card, index) => (
            <div
              key={index}
              //create light blue and red cards that look 3d and pop out on hover and have a shadow and increase size of the card
              className={`flex gap-x-4 rounded-xl p-6 ring-1 ring-inset z-10 hover:shadow-xl hover:scale-105 transformtransition duration-300 ease-in-out                
              ${
                index % 2 === 0
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500"
                  : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500"
              }
              `}
            >
              <div className="text-base leading-7">
                <p className="mt-2 text-gray-100">{card}</p>
              </div>
            </div>
          ))}
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
