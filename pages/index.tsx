import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';

import Navbar from '~/components/Navbar';
import Button from '~/components/atoms/button';

import Footer from '~/components/section/footer';
import ProductList from '~/components/molecules/productlist/index.tsx';
import { GetServerSideProps, NextPage } from 'next';
import { getProductList } from '~/lib/graphcms';
import { IProductList } from '~/interfaces/product';
import FadeSlide from '~/components/animations/FadeSlide';

import ContactUsIllustration from '~/components/illustrations/contactus';
import { colors } from '~/constants/colors';
import { Fade } from 'react-awesome-reveal';
import Contact from '~/components/section/contact';

interface IProps {
  products: IProductList[];
}

const Home: NextPage<IProps> = ({ products }) => {
  return (
    <div className="overflow-hidden w-screen">
      <Navbar isFixed={false} />
      {/* Intro Section */}

      {/* // fallbackColor="#163c61" */}
      <div
        className="flex w-screen py-12 md:py-0 lg:h-screen overflow-hidden flex-col-reverse lg:flex-row items-center px-0 sm:px-24 text-white"
        style={{
          background: colors.primDark,
        }}
      >
        <div className="space-y-8 mt-8 mb-8 flex flex-col items-center">
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
        <div className="lg:w-[55vw] lg:h-[55vh] w-[100vw] h-[50vh] mt-12 lg:mt-0 px-2 sm:px-24 top-0 left-0">
          <Swiper
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
                  src={product.images[0]}
                  className="w-full h-full"
                  style={{ objectFit: 'cover' }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
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

      {/* <div className="mx-4 flex h-screen w-screen flex-row items-center justify-center p-2 md:p-12">
        <div className="w-[45%] overlfow-hidden hidden h-full lg:flex z-10">
          <FadeSlide slideDirection="left">
            <ContactUsIllustration />
          </FadeSlide>
        </div>
        <div className="w-[55%] z-20 bg-white h-full flex flex-col items-center justify-center">
          <FadeSlide slideDirection="down">
            <h1 className="text-6xl  mb-8 text-zinc-900 text-center">
              If You Have Any Queries, Feel Free To Reach Out
            </h1>
          </FadeSlide>
          <FadeSlide slideDirection="up">
            <Link href="/contact">
              <Button>Contact Us</Button>
            </Link>
          </FadeSlide>
        </div>
      </div> */}
      <Contact />
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await getProductList({});

  return {
    props: { products },
  };
};

export default Home;
