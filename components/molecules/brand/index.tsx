import React, { FC, useState } from 'react';
import { Fade, Slide, Reveal } from 'react-awesome-reveal';
import { keyframes } from '@emotion/react';

import { H1 } from '~/components/atoms/headings';
import ProductList from '../productlist';
import useData from './useData';
import { GetServerSideProps } from 'next';
import { getProductList } from '~/lib/graphcms';
import { IProductList } from '~/interfaces/product';
import { ICommonProps } from '~/interfaces/common';
import { appendFileSync } from 'fs';
import { useConfig } from '~/store';

interface IProps extends ICommonProps {
  brand: string;
  fontFamily?: string;
  products?: IProductList[];
}

const Brand: FC<IProps> = ({ brand, fontFamily, products, config }) => {
  const {
    config: {
      appSettings: { colors },
    },
  } = useConfig();
  return (
    <div className="flex flex-col items-center">
      <Fade triggerOnce={true}>
        <Slide triggerOnce={true} direction="down">
          <H1 style={{ fontFamily, color: colors.primary }}>{brand}</H1>
        </Slide>
      </Fade>
      <Fade>
        <div
          className="bg-black h-1 w-[48vw] mt-4"
          style={{ background: colors.primary }}
        ></div>
      </Fade>
      <div
        className="w-full flex items-center justify-center"
        style={{ fontFamily }}
      >
        <ProductList config={config} list={products || []} loading={false} />
      </div>
    </div>
  );
};

export default Brand;
