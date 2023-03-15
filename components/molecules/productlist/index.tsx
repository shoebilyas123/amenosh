import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import Loader from '~/components/atoms/loader';
import useMouseEnterLeave from '~/hooks/useMousEnterLeave';
import { ICommonProps } from '~/interfaces/common';
import { IProductList } from '~/interfaces/product';
import { useConfig } from '~/store';

interface IProps extends ICommonProps {
  list: IProductList[];
  loading?: boolean;
  emptyMessage?: string;
}

const ProductList: FC<IProps> = ({ list, loading, emptyMessage }) => {
  const { config } = useConfig();

  const { activeFor, onMouseEnter, onMouseLeave } = useMouseEnterLeave();
  const router = useRouter();

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full p-12 bg-sky-100">
          <Loader />
        </div>
      ) : list.length > 0 ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 sm:gap-2 md:gap-8 mt-8 overflow-hidden">
          {list.map((item, index: number) => (
            <Fade triggerOnce={true} delay={250}>
              <Slide
                triggerOnce={true}
                delay={250}
                direction={index % 2 ? 'down' : 'up'}
              >
                <div
                  onClick={() => router.push(`/products/${item.title}`)}
                  className={`w-full cursor-pointer  flex flex-col items-center border ${
                    activeFor === index
                      ? 'border-1 border-opacity-10'
                      : 'border-transparent'
                  }`}
                  onMouseEnter={() => onMouseEnter(index)}
                  onMouseLeave={() => onMouseLeave(index)}
                >
                  <img
                    src={item.images[0]}
                    style={{ objectFit: 'cover', height: 270 }}
                  />
                  <p
                    className={`w-full truncate  ${
                      ['#fff', '#ffffff'].some(
                        (clr) =>
                          clr ===
                          config.appSettings?.colors.primary.toLowerCase()
                      )
                        ? 'text-neutral-900'
                        : 'text-white'
                    } text-center py-2 px-4 transition-all`}
                    style={{
                      ...(activeFor === index
                        ? {
                            background: config.appSettings.colors.secondary,
                            color: 'white',
                          }
                        : { background: config.appSettings?.colors.primary }),
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
