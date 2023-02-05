import React, {
  DetailedHTMLProps,
  FormEvent,
  FormEventHandler,
  FormHTMLAttributes,
  InputHTMLAttributes,
  useState,
} from 'react';
import Button from '~/components/atoms/button';

import Input from '~/components/atoms/input';
import Loader from '~/components/atoms/loader';
import Brand from '~/components/molecules/brand';
import ProductList from '~/components/molecules/productlist/index.tsx';
import Navbar from '~/components/Navbar';
import { Footer, SectionContact } from '~/components/section';
import useData from './useData';

const Products = () => {
  const {
    state: { searchValue, loading, productList },
    setters: { setSearchValue },
    actions,
  } = useData();

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
  };

  return (
    <div className="w-screen">
      <Navbar isFixed={false} />
      <div className="flex flex-row items-center border justify-center mb-8 p-8 bg-rose-50">
        <form onSubmit={onSearch} className="space-x-2">
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
        </form>
      </div>

      <div className="px-48 ">
        {!searchValue ? (
          <Brand brand="Clumsy Candy" />
        ) : loading && searchValue ? (
          <div className="w-full h-[48vh] bg-white flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <ProductList
            list={productList}
            loading={loading}
            emptyMessage="No Products Found"
          />
        )}
      </div>
      <SectionContact className="mt-12" />
      <Footer />
    </div>
  );
};

export default Products;
