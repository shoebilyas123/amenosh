import Link from 'next/link';
import React, { FC } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '~/components/button';
import useToggler from '~/hooks/useToggler';

interface IProps {
  width: string;
  height: string;
  imgHeight: number;
  overlay?: {
    url: string;
    text: string;
    isButton: boolean;
  };
  images: Array<string>;
}

const DisplayCarousel: FC<IProps> = ({
  width,
  height,
  overlay,
  imgHeight,
  images,
}) => {
  const { open, close, isOpen } = useToggler();

  return (
    <div
      className={`w-${width} h-${height} relative overflow-hidden flex items-center p-0 m-4`}
      onMouseEnter={() => open()}
      onMouseLeave={() => close()}
    >
      {isOpen && overlay && (
        <>
          <div className="w-full h-full z-40 bg-black absolute opacity-75"></div>
          <div className="w-[100%] h-[100%] absolute z-50 flex items-center justify-center">
            <Link href={`${overlay?.url}`}>
              {overlay?.isButton ? (
                <Button>{overlay.text}</Button>
              ) : (
                <span className="text-white hover:text-bg-rose-600">
                  {overlay?.text}
                </span>
              )}
            </Link>
          </div>
        </>
      )}
      <Swiper
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation, Pagination]}
        className="z-40"
      >
        {images.map((img) => (
          <SwiperSlide className="h-full">
            <img
              src={img}
              style={{
                objectFit: 'cover',
                overflow: 'hidden',
                height: `${imgHeight}px`,
                width: '100%',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DisplayCarousel;
