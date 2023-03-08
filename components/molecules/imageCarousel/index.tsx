import React, { FC, useState } from 'react';
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import { GlassMagnifier } from 'react-image-magnifiers';
import { useConfig } from '~/store';

interface IProps {
  images: Array<string>;
  onImageClick?: () => void;
}

const ImageCarousel: FC<IProps> = ({ onImageClick, images }) => {
  const [currentImage, setCurrentImage] = useState<string>(images[0]);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [currentFullScreenImage, setCurrentFullScreenImage] = useState<string>(
    images[0]
  );

  const onExitFullScreen = () => setIsFullScreen(false);

  const {
    config: {
      appSettings: { colors },
    },
  } = useConfig();

  return (
    <div className="w-100 mx-6 mb-6 md:w-[35vw]">
      {isFullScreen && (
        <div
          style={{ zIndex: 999999 }}
          className="fixed -top-2 -left-2 w-screen h-screen flex items-center justify-center"
        >
          <div
            className="fixed w-full h-full bg-black opacity-30"
            onClick={onExitFullScreen}
          ></div>
          <div className="w-screen flex flex-col items-center justify-center">
            <div
              className="w-full px-12 text-2xl font-bold flex items-end justify-end text-white z-50 cursor-pointer"
              onClick={onExitFullScreen}
            >
              X
            </div>
            <div className="w-[80vw] lg:w-[40vw]">
              <div
                className="flex items-center content-center m-auto border no-tailwind"
                onClick={onImageClick}
              >
                <span className="w-fit bg-white">
                  <GrFormPreviousLink />
                </span>
                <GlassMagnifier
                  imageSrc={currentFullScreenImage}
                  magnifierSize="50%"
                  allowOverflow={false}
                  imageAlt="Product Image"
                  largeImageSrc={currentFullScreenImage}
                />
                <span className="w-fit bg-white">
                  <GrFormNextLink className="bg-white" />
                </span>
              </div>
              <div className="flex flex-wrap">
                {images.map((img) => {
                  return (
                    <img
                      className={`w-16 h-16 object-cover border border-transparent hover:border-neutral-400  cursor-pointer transition-all`}
                      src={img}
                      style={{
                        zIndex: 99999,
                        ...(currentFullScreenImage === img
                          ? { border: `2px solid ${colors.secondary}` }
                          : {}),
                      }}
                      onClick={() => setCurrentFullScreenImage(img)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className="flex items-center content-center m-auto border no-tailwind"
        onClick={() => setIsFullScreen(true)}
      >
        <GlassMagnifier
          imageSrc={currentImage}
          magnifierSize="50%"
          allowOverflow={false}
          imageAlt="Product Image"
          largeImageSrc={currentImage}
        />
      </div>
      <div className="flex flex-wrap ">
        {images.map((img) => {
          return (
            <img
              className={`w-16 h-16 object-cover border border-transparent hover:border-neutral-400  cursor-pointer hover:opacity-50 transition-all`}
              src={img}
              style={{
                ...(currentImage === img
                  ? { border: `2px solid ${colors.secondary}` }
                  : {}),
              }}
              onClick={() => setCurrentImage(img)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ImageCarousel;
