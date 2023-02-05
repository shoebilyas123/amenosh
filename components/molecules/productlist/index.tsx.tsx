import React, { FC } from 'react';
import Loader from '~/components/atoms/loader';
import { IProductList } from '~/interfaces/product';

interface IProps {
  list: IProductList[];
  loading: boolean;
  emptyMessage?: string;
}

const ProductList: FC<IProps> = ({ list, loading, emptyMessage }) => {
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full p-12 bg-rose-50">
          <Loader />
        </div>
      ) : list.length > 0 ? (
        <div className="grid grid-cols-4 gap-8 mt-8 ">
          {list.map((item) => (
            <div
              className="flex flex-col items-center"
              style={{ width: 320, height: 340 }}
            >
              <img
                src={item.images[0]}
                style={{ objectFit: 'cover', height: 270 }}
              />
              <p className="w-full text-center py-2 px-4 text-white bg-rose-500">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-[100vw] flex items-center justify-center p-24 border-2 border-red-300">
          {emptyMessage || ''}
        </div>
      )}
    </>
  );
};

export default ProductList;
