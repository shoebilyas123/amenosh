import React from 'react';
import { Fade, Slide, Reveal } from 'react-awesome-reveal';
import { keyframes } from '@emotion/react';

import { H1 } from '~/components/atoms/headings';
import ProductList from '../productlist/index.tsx';
import useData from './useData';

interface IParams {
  brand: string;
}

const Brand = ({ brand }: IParams) => {
  const {
    state: { brandProducts, loading },
    actions: { fetchData },
  } = useData({ brand });

  return (
    <div className="flex flex-col items-center">
      <Fade triggerOnce={true}>
        <Slide triggerOnce={true} direction="down">
          <H1>{brand}</H1>
        </Slide>
      </Fade>
      <Fade>
        <div className="bg-black h-1 w-[48vw] mt-4"></div>
      </Fade>
      <div className="w-full flex items-center justify-center">
        <ProductList list={brandProducts} loading={loading} />
      </div>
    </div>
  );
};

export default Brand;
