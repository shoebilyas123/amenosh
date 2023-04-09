import React, { FC, PropsWithChildren, ReactHTMLElement } from 'react';
import { Fade, Slide } from 'react-awesome-reveal';

interface IProps {
  triggerOnce?: boolean;
  slideDirection?: 'down' | 'up' | 'right' | 'left';
  delay?: number;
}

const FadeSlide: FC<PropsWithChildren<IProps>> = ({
  children,
  triggerOnce = true,
  slideDirection = 'up',
  delay = 0,
}) => {
  return (
    <Fade triggerOnce={triggerOnce}>
      <Slide direction={slideDirection} triggerOnce={triggerOnce}>
        {children}
      </Slide>
    </Fade>
  );
};

export default FadeSlide;
