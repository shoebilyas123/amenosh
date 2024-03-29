// node_module imports
import React, { useState } from 'react';

// local Imports
import Navbar from '~/components/Navbar';
import { AboutBanner, Footer, SectionContact } from '~/components/section';
import { GetServerSideProps, NextPage } from 'next';
import { getProductList } from '~/lib/graphcms';
import { IProductList } from '~/interfaces/product';
import { ICommonProps } from '~/interfaces/common';
import { useConfig } from '~/store';
import { H1 } from '~/components/atoms/headings';
import { SwiperSlide, Swiper } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { GlassMagnifier } from 'react-image-magnifiers';
import ImageCarousel from '~/components/molecules/imageCarousel';
import Card from '~/components/card';
import { AiFillMail, AiFillPhone } from 'react-icons/ai';
import DynamicHead from '~/components/Document/DynamicHead';

interface IProps extends ICommonProps {
  productImages: Array<string>;
  product: IProductList;
}

const ProductDescription: NextPage<IProps> = ({ productImages, product }) => {
  const {
    config: {
      appSettings: { colors },
      contentControls: { favicon },
    },
  } = useConfig();
  const { price, details } = product.description;
  let detailsKeys = Object.keys(details || {});

  return (
    <>
      <DynamicHead
        title={product.title}
        description={product.aboutProduct.substring(0, 100)}
        {...{ favicon }}
      />
      <div className="w-screen relative overflow-hidden">
        <Navbar isFixed={false} />
        {/* <AboutBanner /> */}
        <div className="flex flex-col lg:flex-row md:items-start md:space-x-4 justify-center w-[100%]  my-8">
          <ImageCarousel images={productImages} />

          <div className="w-[90vw] mx-6 lg:w-[40vw] space-y-4">
            <div className="w-[100%]">
              <H1 className="font-bold text-2xl mb-4">{product.title}</H1>
              <p className="text-xl font-bold mb-4">
                Price -{' '}
                <span className="text-green-900"> &#x20B9;{price || ''}</span>
              </p>
              <div>
                <hr className="mt-4 mb-2" />
                <H1
                  className="text-xl font-bold mb-4"
                  style={{
                    fontFamily: "'Garamound', serif",
                  }}
                >
                  Description
                </H1>
                <p
                  style={{
                    fontFamily: "'Garamound', serif",
                  }}
                  // className="italic"
                >
                  {(product.aboutProduct || '')
                    .split('\n')
                    .map((str: string) => {
                      return (
                        <>
                          <span>{str}</span>
                          <br />
                        </>
                      );
                    })}
                </p>
              </div>
              <hr className="mt-4" />
            </div>

            <div className="w-[100%]">
              <H1
                className="text-lg font-medium w-full text-center"
                style={{
                  background: colors.secondary,
                  color: 'white',
                }}
              >
                Details
              </H1>
              {detailsKeys && (
                <table className="table-auto border w-[100%]">
                  <tbody className="space-y-2">
                    {detailsKeys?.map((Dkey: string, index: number) => (
                      <tr
                        className={`${
                          index % 2 === 0 ? 'bg-slate-100' : 'bg-white'
                        }`}
                      >
                        <td className="px-4 py-2">{Dkey}</td>
                        <td>
                          {
                            // @ts-ignore
                            details[Dkey]
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
        <SectionContact showWave={true} waveColor={colors.secondary} />
        <Footer />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  const product: any = await getProductList({
    name: (query.productId as string) || '',
  });

  if (!product || !product[0]) {
    return { notFound: true };
  }

  const images = product.map((prod: IProductList) => prod.images).flat();
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  return {
    props: {
      product: product[0],
      productImages: images,
    },
  };
};

export default ProductDescription;
