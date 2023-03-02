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

interface IProps extends ICommonProps {
  productImages: Array<string>;
  product: IProductList;
}

const DUMMYDATA = {
  price: '240',
  name: 'Clumsy Imli Candy',
  description: `Clumsy candy is a quality product of Amenosh.

    Clumsy Imli candy is made with premium ingredients. Quality fruit powders and active ingredients added to the candy impart it the flavor of high quality Indian tamarind. 
    
    The candies have been flavor tested and have been perfected to appeal to the masses. 
    
    Go ahead and place your order!`,
  details: {
    Brand: 'Clumsy',

    Flavour: 'Imli',
    Type: 'Hard Candy',
    Shape: 'Oval',

    Packaging: 'Type',
    Plastic: 'Jar',
  },
};

const ProductDescription: NextPage<IProps> = ({ productImages, product }) => {
  const {
    config: {
      appSettings: { colors },
    },
  } = useConfig();
  const { name, price, details, description } = DUMMYDATA;

  const detailsKeys = Object.keys(details);

  return (
    <div className="w-screen overflow-hidden">
      <Navbar isFixed={false} />
      {/* <AboutBanner /> */}
      <div className="flex flex-col md:flex-row md:items-start md:space-x-4 justify-center w-screen my-8">
        <ImageCarousel images={productImages} />

        <div className="w-100 mx-6 md:w-[40vw] space-y-4">
          <H1 className="font-bold text-2xl mb-4">{product.title}</H1>
          <p className="text-xl font-bold">
            Price - <span className="text-green-900"> &#x20B9;{price}</span>
          </p>
          <div>
            <H1 className="text-lg font-medium">Description</H1>
            <p>{description}</p>
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
            <table className="table-auto border w-[100%]">
              <tbody className="space-y-2">
                {detailsKeys.map((Dkey: string, index: number) => (
                  <tr
                    className={`${
                      index % 2 === 0 ? 'bg-slate-100' : 'bg-white'
                    }`}
                  >
                    <td className="px-4 py-2">{Dkey}</td>
                    <td>
                      {
                        // @ts-ignore
                        details[`${Dkey}`]
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <SectionContact showWave={true} waveColor={colors.secondary} />
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  const product: any = await getProductList({
    productId: (query.productId as string) || '',
  });
  const images = product.map((prod: IProductList) => prod.images[0]);

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
