import React, { FC, useEffect, useRef } from 'react';

interface IProps {
  url: string;
  currentIndex: number;
}

const Candies: FC<IProps> = ({ url, currentIndex }) => {
  function getRandom(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const refTemp = useRef<any>();

  const trackMouseMove = (event: MouseEvent) => {
    const mousePosition = { x: event.pageX, y: event.pageY };
    const elPos = {
      x: (refTemp.current as HTMLElement).getBoundingClientRect().x,
      y: (refTemp.current as HTMLElement).getBoundingClientRect().y,
    };

    if (Math.abs(elPos.x - mousePosition.x) < 50) {
      if (mousePosition.x < elPos.x) {
        console.log({ elPos });
        refTemp.current.style.transform = `translateX(${
          (refTemp.current.getBoundingClientRect().x - mousePosition.x) / 100
        })`;
      } else {
        refTemp.current.style.transform = `translateX(${Math.abs(
          (refTemp.current.getBoundingClientRect().x - mousePosition.x) / 100
        )})`;
      }
    }
  };

  useEffect(() => {
    if (refTemp) {
      document.body?.addEventListener('mousemove', trackMouseMove);
      refTemp.current.style.transition = 'all .2s ease-in-out 0';
      refTemp.current.style.position = 'absolute';
      refTemp.current.style.left = getRandom(-15, 65) + '%';
      refTemp.current.style.top = getRandom(-6, 60) + '%';
      var animate = refTemp.current.animate(
        [
          {
            opacity: '0',
            transform: 'rotate(' + getRandom(-12, 12) + 'deg) ',
          },
          {
            opacity: '1',
            transform: 'rotate(' + getRandom(-8, 8) + 'deg)',
          },
        ],
        {
          duration: 2000,
          fill: 'forwards',
        }
      );
    }
  }, [refTemp]);

  return <img width={425} src={url} ref={refTemp} />;
};

export default Candies;
