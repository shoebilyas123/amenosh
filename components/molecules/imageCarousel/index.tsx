import React, { FC, useState } from 'react';
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import { GlassMagnifier } from 'react-image-magnifiers';
import Button from '~/components/atoms/button';
import { useConfig } from '~/store';
import FullScreenImageViewer from '../FullScreenImageViewer';

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
          className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center"
        >
          <div
            className="fixed w-full h-full bg-black opacity-30"
            onClick={onExitFullScreen}
          ></div>
          <div className="w-screen h-screen flex flex-col items-center justify-center">
            <div
              className="w-full px-12 mt-8 text-2xl font-bold flex items-end justify-end text-white z-50 cursor-pointer"
              onClick={onExitFullScreen}
            >
              X
            </div>
            <FullScreenImageViewer images={images} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
