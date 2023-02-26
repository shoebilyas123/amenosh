import React, { FC } from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import Loader from '~/components/atoms/loader';
import { colors } from '~/constants/colors';
import { IProductList } from '~/interfaces/product';

interface IProps {
  list: IProductList[];
  loading?: boolean;
  emptyMessage?: string;
}

const ProductList: FC<IProps> = ({ list, loading, emptyMessage }) => {
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full p-12 bg-sky-100">
          <Loader />
        </div>
      ) : list.length > 0 ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 sm:gap-2 md:gap-8 mt-8 overflow-hidden">
          {list.map((item, index: number) => (
            <Fade triggerOnce={true} delay={250}>
              <Slide
                triggerOnce={true}
                delay={250}
                direction={index % 2 ? 'down' : 'up'}
              >
                <div
                  className="w-full flex flex-col items-center"
                  // style={{ width: 320, height: 340 }}
                >
                  <img
                    src={item.images[0]}
                    style={{ objectFit: 'cover', height: 270 }}
                  />
                  <p
                    className="w-full truncate text-white text-center py-2 px-4"
                    style={{
                      background: colors.primary,
                    }}
                  >
                    {item.title}
                  </p>
                </div>
              </Slide>
            </Fade>
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
