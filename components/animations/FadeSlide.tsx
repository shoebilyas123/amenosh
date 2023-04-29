import React, { FC, PropsWithChildren, ReactHTMLElement } from 'react';
import { Fade, Slide } from 'react-awesome-reveal';

interface IProps {
  triggerOnce?: boolean;
  slideDirection?: 'down' | 'up' | 'right' | 'left';
  delay?: number;
  slideOptions?: Record<any, any>;
  fadeOptions?: Record<any, any>;
}

const FadeSlide: FC<PropsWithChildren<IProps>> = ({
  children,
  slideDirection = 'up',
  delay = 0,
  slideOptions = {},
  fadeOptions = {},
}) => {
  return (
    <Fade {...fadeOptions}>
      <Slide direction={slideDirection} {...slideOptions}>
        {children}
      </Slide>
    </Fade>
  );
};

export default FadeSlide;
