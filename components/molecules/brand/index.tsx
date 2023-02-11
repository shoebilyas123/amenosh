import React, { FC, useState } from 'react';
import { Fade, Slide, Reveal } from 'react-awesome-reveal';
import { keyframes } from '@emotion/react';

import { H1 } from '~/components/atoms/headings';
import ProductList from '../productlist/index.tsx';
import useData from './useData';
import { GetServerSideProps } from 'next';
import { getProductList } from '~/lib/graphcms';
import { IProductList } from '~/interfaces/product';

// interface IProps {
//   brand: string;
//   fontFamily?: string;
//   products?: IProductList[];
// }

const Brand = () =>
  // { brand, fontFamily, products }
  {
    // const [brandProducts, setBrandProducts] = useState<IProductList[]>(
    // (products || []).filter((product) => product.brand === brand)
    // );

    return (
      <div className="flex flex-col items-center">
        {/* <Fade triggerOnce={true}>
        <Slide triggerOnce={true} direction="down">
          <H1 style={{ fontFamily }}>{brand}</H1>
        </Slide>
      </Fade>
      <Fade>
        <div className="bg-black h-1 w-[48vw] mt-4"></div>
      </Fade>
      <div
        className="w-full flex items-center justify-center"
        style={{ fontFamily }}
      >
        <ProductList list={brandProducts} loading={false} />
      </div> */}
      </div>
    );
  };

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await getProductList({});
  return { props: { products } };
};

export default Brand;
