import axios from 'axios';
import { debounce } from 'lodash';
import { NextPage } from 'next';
import React, {
  DetailedHTMLProps,
  FormEvent,
  FormEventHandler,
  FormHTMLAttributes,
  InputHTMLAttributes,
  useEffect,
  useState,
} from 'react';
import Button from '~/components/atoms/button';

import Input from '~/components/atoms/input';
import Loader from '~/components/atoms/loader';
import Brand from '~/components/molecules/brand';
import ProductList from '~/components/molecules/productlist/index.tsx';
import Navbar from '~/components/Navbar';
import { Footer, SectionContact } from '~/components/section';
import useLoading from '~/hooks/useLoading';
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
      <div
        className="flex flex-row items-center border justify-center mb-8 p-8 "
        style={{ background: '#b4c7d9' }}
      >
        {/* <form onSubmit={onSearch} className="space-x-2">
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue((e.target as any)?.value || '')}
            className="min-w-[52vw] rounded-full"
            placeholder={'Search products...'}
          />
          <Button
            type="submit"
            className="xss:hidden xs:hidden sm:hidden md:inline"
          >
            Search
          </Button>
        </form> */}
      </div>

      <div className="sm:px-2 md:px-4">
        <Brand brand="Clumsy Candy" fontFamily="Mallow" />
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

export async function getServerSideProps() {
  const products = await getProductList({});

  return { props: { products } };
}

export default Products;
