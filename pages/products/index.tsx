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
  const [searchValue, setSearchValue] = useState<string>('');
  const [productList, setProductList] = useState<IProductList[]>([]);
  const { loading, startloading, stoploading } = useLoading();

  const fetchData = debounce(async () => {
    if (loading || !searchValue) {
      return;
    }

    try {
      startloading();
      const { data } = await axios.post('/api/products/list', {
        name: searchValue,
      });
      setProductList(data);
      stoploading();
    } catch (error) {
      stoploading();
    }
  }, 1500);

  useEffect(() => {
    if (loading || !searchValue) return;
    else fetchData();
  }, [searchValue]);

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
  };

  return (
    <div className="w-screen">
      <Navbar isFixed={false} />
      <div
        className="flex flex-row items-center border justify-center mb-8 p-8 "
        style={{ background: '#b4c7d9' }}
      >
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
          <Brand brand="Clumsy Candy" fontFamily="Mallow" />
        ) : loading && searchValue ? (
          <div className="w-full h-[48vh] bg-white flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <ProductList
            list={products}
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

export async function getServerSideProps() {
  const products = await getProductList({});

  return { props: { products } };
}

export default Products;
