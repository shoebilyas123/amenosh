import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import Brand from '~/components/molecules/brand';
import ProductList from '~/components/molecules/productlist/index.tsx';
import Navbar from '~/components/Navbar';
import { Footer, SectionContact } from '~/components/section';
import { IProductList } from '~/interfaces/product';
import { getProductList } from '~/lib/graphcms';

interface IProps {
  products: IProductList[];
}

const Products: NextPage<IProps> = ({ products }) => {
  console.log({ products });

  return (
    <div className="w-screen">
      <Navbar isFixed={false} />

      <div className="w-full flex justify-center sm:px-2 md:px-48">
        <ProductList
          list={products}
          loading={false}
          emptyMessage="No Products Found"
        />
      </div>
      <SectionContact className="mt-12" />
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await getProductList({});

  return { props: { products } };
};

export default Products;
