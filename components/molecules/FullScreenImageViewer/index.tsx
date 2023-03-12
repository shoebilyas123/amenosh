import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Zoom, Navigation, Pagination, Thumbs, FreeMode } from 'swiper';

interface IProps {
  images: Array<string>;
  enableZoom?: boolean;
}

export default function FullScreenImageViewer({
  images,
  enableZoom = true,
}: IProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          // @ts-ignore
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
          zIndex: 99999,
        }}
        zoom={true}
        navigation={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        thumbs={{
          swiper:
            thumbsSwiper && !(thumbsSwiper as any).destroyed
              ? thumbsSwiper
              : null,
        }}
        // allowTouchMove={false}
        modules={[
          ...(enableZoom ? [Zoom] : []),
          Navigation,
          Pagination,
          Thumbs,
        ]}
        className="mySwiper2 w-[100%] h-[90%]"
      >
        {images.map((imgUrl) => (
          <SwiperSlide>
            <div className="swiper-zoom-container ">
              <img src={imgUrl} className="bg-white" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        //   @ts-ignore
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper h-24 w-[100%] sm:w-[45%]"
      >
        {images.map((imgUrl) => (
          <SwiperSlide>
            <div className="swiper-zoom-container">
              <img src={imgUrl} className="bg-white" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
