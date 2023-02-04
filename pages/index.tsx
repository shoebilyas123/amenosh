import {
  motion,
  LazyMotion,
  domAnimation,
  useViewportScroll,
} from 'framer-motion';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Autoplay,
  Controller,
  FreeMode,
  Keyboard,
  Navigation,
  Pagination,
  Scrollbar,
  Thumbs,
} from 'swiper';
import {
  AiFillAccountBook,
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillMail,
  AiFillPhone,
} from 'react-icons/ai';

import EvenSection from '~/components/HomeSections/SectionEven';
import OddSection from '~/components/HomeSections/SectionOdd';
import Navbar from '~/components/Navbar';
import { SplashScreen } from '~/components/SplashScreen';
import SmoothScroll from '~/components/Layout/SmoothScroll';
import Button from '~/components/button';

import Card from '~/components/card';
import Footer from '~/components/section/footer';

const Home = () => {
  const isBigScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  return (
    <div>
      <SplashScreen>
        <Navbar />
        <SmoothScroll active={isBigScreen}>
          {/* Intro Section */}
          <EvenSection
            fallbackColor="#94073d"
            background="https://images.unsplash.com/photo-1571506165871-ee72a35bc9d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
            heading=""
            content={
              <div className="flex flex-row items-center px-24 text-white">
                <div>
                  <h1 className="text-6xl mb-4">Welcome To Amenosh</h1>
                  <p className="w-[30vw] mb-4">
                    AMENOSH is a parent brand under which there will be multiple
                    brands. First brand to launch under AMENOSH is Clumsy candy
                    in 6 different flavors - Orange, Ripe Mango, Litchi, Imli,
                    Ginger, and Lemon-Mint. The only SKU we are launching with
                    is a candy jar with 170 candy units per flavor, making it 6
                    different SKUs.
                  </p>
                  <Link href="/about">
                    <Button>View More</Button>
                  </Link>
                </div>
                <div className="w-[50vw] px-24 h-[55vh] top-0 left-0 ">
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
                    className="w-[100%] h-[100%] border-2 border-white shadow-lg"
                    modules={[Pagination, Autoplay]}
                    spaceBetween={50}
                    slidesPerView={1}
                  >
                    <SwiperSlide className="w-full">
                      <img
                        src="https://images.unsplash.com/photo-1571506165871-ee72a35bc9d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
                        className="w-full"
                      />
                    </SwiperSlide>
                    <SwiperSlide className="w-full">
                      <img
                        src="https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                        className="w-full"
                      />
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            }
            showBG={false}
          />
          <OddSection
            fallbackColor="#fff"
            background="https://images.unsplash.com/photo-1575224300306-1b8da36134ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FuZHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
            heading=""
            showBG={false}
            className=""
            content={
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-6xl mb-4 text-zinc-800">Our Products</h1>
                <Swiper
                  loop={true}
                  slidesPerView={3}
                  slidesPerGroup={3}
                  spaceBetween={30}
                  freeMode={true}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[FreeMode, Pagination, Keyboard, Scrollbar]}
                  className="mySwiper w-[70vw] mx-auto mb-12 pl-6 flex items-center justify-center"
                >
                  <SwiperSlide>
                    <Card className="rounded-none border border-rose-700">
                      <img
                        src="https://images.unsplash.com/photo-1599929219210-7c422e4d5208?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                        style={{
                          width: 250,
                          height: 300,
                          objectFit: 'cover',
                        }}
                        className="object-cover mb-4"
                      />
                      <Button>Clumsy Candy Orange</Button>
                    </Card>
                  </SwiperSlide>

                  <SwiperSlide>
                    <Card>
                      <img
                        src="https://images.unsplash.com/photo-1599929219210-7c422e4d5208?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                        style={{
                          width: 250,
                          height: 300,
                          objectFit: 'cover',
                        }}
                        className="object-cover mb-4"
                      />
                      <Button>Clumsy Candy Litchi</Button>
                    </Card>
                  </SwiperSlide>

                  <SwiperSlide>
                    <Card>
                      <img
                        src="https://images.unsplash.com/photo-1599929219210-7c422e4d5208?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                        style={{
                          width: 250,
                          height: 300,
                          objectFit: 'cover',
                        }}
                        className="object-cover mb-4"
                      />
                      <Button>Clumsy Candy Imli</Button>
                    </Card>
                  </SwiperSlide>

                  <SwiperSlide>
                    <Card>
                      <img
                        src="https://images.unsplash.com/photo-1599929219210-7c422e4d5208?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                        style={{
                          width: 250,
                          height: 300,
                          objectFit: 'cover',
                        }}
                        className="object-cover mb-4"
                      />
                      <Button>Clumsy Candy Lemon Mint</Button>
                    </Card>
                  </SwiperSlide>
                  <SwiperSlide>
                    <Card>
                      <img
                        src="https://images.unsplash.com/photo-1599929219210-7c422e4d5208?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                        style={{
                          width: 250,
                          height: 300,
                          objectFit: 'cover',
                        }}
                        className="object-cover mb-4"
                      />
                      <Button>Clumsy Candy Orange</Button>
                    </Card>
                  </SwiperSlide>
                  <SwiperSlide>
                    <Card>
                      <img
                        src="https://images.unsplash.com/photo-1599929219210-7c422e4d5208?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                        style={{
                          width: 250,
                          height: 300,
                          objectFit: 'cover',
                        }}
                        className="object-cover mb-4"
                      />
                      <Button>Clumsy Candy Orange</Button>
                    </Card>
                  </SwiperSlide>
                </Swiper>
                <Button>View More</Button>
              </div>
            }
          />
        </SmoothScroll>
        <EvenSection
          fallbackColor="#fff"
          background="https://images.unsplash.com/photo-1528747045269-390fe33c19f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          heading=""
          showBG={true}
          content={
            <div className="mx-4 flex flex-col items-center justify-center p-12">
              <h1 className="text-6xl mb-8 text-zinc-900">
                If You Have Any Queries, Feel Free To Reach Out
              </h1>
              <Link href="/contact">
                <Button>Contact Us</Button>
              </Link>

              <div className="mt-4 flex flex-row items-center space-x-2">
                <div className="rounded-full w-8 h-8 p-1 flex items-center justify-center border-2 hover:bg-rose-800 cursor-pointer">
                  <AiFillInstagram className="w-full h-full text-rose-800 hover:text-white" />
                </div>
                <div className="rounded-full w-8 h-8 p-1 flex items-center justify-center border-2 hover:bg-rose-800 cursor-pointer">
                  <AiFillFacebook className="w-full h-full text-rose-800 hover:text-white" />
                </div>
                <div className="rounded-full w-8 h-8 p-1 flex items-center justify-center border-2 border-rose-800 hover:bg-rose-800 cursor-pointer">
                  <AiFillLinkedin className="w-full h-full text-rose-800 hover:text-white" />
                </div>
              </div>
            </div>
          }
        />
        <Footer />
      </SplashScreen>
    </div>
  );
};

export default Home;
