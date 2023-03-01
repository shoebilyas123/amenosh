import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import Brand from '~/components/molecules/brand';
import ProductList from '~/components/molecules/productlist/index';
import Navbar from '~/components/Navbar';
import { Footer, SectionContact } from '~/components/section';
import { IProductList } from '~/interfaces/product';
import { getProductList } from '~/lib/graphcms';
import { groupBy } from 'lodash';
import { ICommonProps } from '~/interfaces/common';

interface IProps extends ICommonProps {
  products: IProductList[];
}

const Products: NextPage<IProps> = ({ products }) => {
  const productsByBrand = groupBy(products, 'brand');

  return (
    <div className="w-screen">
      <Navbar isFixed={false} />

      <div className="w-full flex justify-center sm:px-2 md:px-24 lg:px-36 mt-8">
        {Object.keys(productsByBrand).map((brandKey) => (
          <Brand
            brand={brandKey}
            products={productsByBrand[brandKey]}
            key={brandKey}
            fontFamily={'Mallow'}
          />
        ))}
      </div>
      <SectionContact showWave={false} className="mt-12" />
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await getProductList({});

  return { props: { products } };
};

export default Products;
