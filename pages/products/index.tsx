import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import Brand from '~/components/molecules/brand';
import ProductList from '~/components/molecules/productlist/index.tsx';
import Navbar from '~/components/Navbar';
import { Footer, SectionContact } from '~/components/section';
import { IProductList } from '~/interfaces/product';
import { getProductList } from '~/lib/graphcms';
import { groupBy } from 'lodash';
import { ICommonProps } from '~/interfaces/common';

interface IProps extends ICommonProps {
  products: IProductList[];
}

const Products: NextPage<IProps> = ({ products, config }) => {
  const productsByBrand = groupBy(products, 'brand');

  return (
    <div className="w-screen">
      <Navbar config={config} isFixed={false} />

      <div className="w-full flex justify-center sm:px-2 md:px-24 lg:px-36 mt-8">
        {Object.keys(productsByBrand).map((brandKey) => (
          <Brand
            config={config}
            brand={brandKey}
            products={productsByBrand[brandKey]}
            key={brandKey}
            fontFamily={'Mallow'}
          />
        ))}
      </div>
      <SectionContact config={config} showWave={false} className="mt-12" />
      <Footer config={config} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await getProductList({});

  return { props: { products } };
};

export default Products;
