import React, { useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { Fade } from 'react-awesome-reveal';

import Navbar from '~/components/Navbar';
import Button from '~/components/atoms/button';
import Footer from '~/components/section/footer';
import ProductList from '~/components/molecules/productlist/index';
import { getCandyWrappers, getProductList } from '~/lib/graphcms';
import { IProductList } from '~/interfaces/product';
import FadeSlide from '~/components/animations/FadeSlide';

import Contact from '~/components/section/contact';
import { ICommonProps } from '~/interfaces/common';
import { useConfig } from '~/store';

interface IProps extends ICommonProps {
  products: IProductList[];
  candyWrappers: Array<{ url: string; id: string }>;
}

let isServer = typeof window === 'undefined';

const Home: NextPage<IProps> = ({ products, candyWrappers }) => {
  const { config } = useConfig();
  console.log({ products });
  // @ts-ignore
  const waveRef = useRef<any>();

  const mouseMoveWave = (event: any) => {
    const mousePosition = { x: event.pageX, y: event.pageY };
    // @ts-ignore
    waveRef.current.style.transform = `translateY(${
      (mousePosition.y + mousePosition.x) / 25
    }px)`;
  };

  useEffect(() => {
    if (waveRef && !isServer) {
      waveRef.current.style.transition = 'all .2 ease-in-out 0';
      document.body?.addEventListener('mousemove', mouseMoveWave);
    }

    return () => {
      document?.body.removeEventListener('mousemove', mouseMoveWave);
    };
  }, [waveRef]);

  return (
    <div className="overflow-hidden w-screen">
      <Navbar isFixed={false} />
      {/* Intro Section */}

      {/* // fallbackColor="#163c61" */}
      <div
        className="relative flex w-screen py-12 md:py-0 lg:h-screen overflow-hidden flex-col lg:flex-row items-center px-0 sm:px-24 text-white"
        style={{
          // background: colors.homeWavePrimary,
          background: `url(
            "https://images.unsplash.com/photo-1574981927289-b8c07f3b2350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          )`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          position: 'relative',
          color: '#FFF',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <div className="space-y-8 mt-8 mb-8 flex flex-col items-center z-50">
          <FadeSlide slideDirection="down">
            <h1 className="text-4xl md:text-6xl mx-8 lg:mx-0 text-center lg:text-left lg:mb-4">
              Welcome To Amenosh
            </h1>
          </FadeSlide>
          <Fade triggerOnce={true}>
            <p className="w-100 mb-4 mx-12 text-center lg:mx-0 lg:text-left">
              AMENOSH is a parent brand under which there will be multiple
              brands. First brand to launch under AMENOSH is Clumsy candy in 6
              different flavors - Orange, Ripe Mango, Litchi, Imli, Ginger, and
              Lemon-Mint. The only SKU we are launching with is a candy jar with
              170 candy units per flavor, making it 6 different SKUs.
            </p>
          </Fade>
          <FadeSlide slideDirection="up">
            <Link href="/about">
              <Button>View More</Button>
            </Link>
          </FadeSlide>
        </div>
        <div className="relative z-50 lg:w-[55vw] lg:h-[55vh] w-[100vw] h-[50vh] mt-12  px-2 lg:px-24 lg:mt-0 top-0 left-0">
          {/* <Swiper
            loop={true}
            navigation={true}
            grabCursor={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            className="w-[100%] h-[100%] shadow-lg"
            modules={[Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
          >
            {products.map((product) => (
              <SwiperSlide className="w-full h-full">
                <img
                  key={product.id}
                  src={product.images[0]}
                  className="w-full h-full"
                  style={{ objectFit: 'cover' }}
                  // layout="fill"
                />
              </SwiperSlide>
            ))}
          </Swiper> */}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="hidden md:block left-0 bottom-0 absolute w-screen z-20"
          id="homepage-banner"
          ref={waveRef}
        >
          <path
            fill="#fff"
            fill-opacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,170.7C384,160,480,160,576,176C672,192,768,224,864,229.3C960,235,1056,213,1152,176C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <div
          className="w-[100vw] h-[100%] absolute top-0 left-0 -z-5"
          style={{
            background: `linear-gradient(to right, ${config?.appSettings?.colors.homeWavePrimary},${config.appSettings?.colors.homeWavePrimary}, rgba(0,0,0,0))`,
          }}
        ></div>
      </div>

      <div className=" md:h-screen w-screen mt-12 flex flex-col items-center justify-center sm:p-4 space-y-8">
        <FadeSlide triggerOnce={true} slideDirection="up">
          <h1 className="text-6xl mb-4 text-zinc-800">Our Products</h1>
        </FadeSlide>

        <ProductList list={products.slice(0, 4)} />
        <Link href={'/products'} className="mt-12">
          <Button>View More</Button>
        </Link>
      </div>

      <Contact />
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await getProductList({});
  const candyWrappers = await getCandyWrappers();
  return {
    props: { products, candyWrappers },
  };
};

export default Home;
