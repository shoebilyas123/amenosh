// node_module imports
import React, { useState } from "react";

// local Imports
import Navbar from "~/components/Navbar";
import { Footer, SectionContact } from "~/components/section";
import { GetServerSideProps, NextPage } from "next";
import { getProductList } from "~/lib/graphcms";
import { IProductList } from "~/interfaces/product";
import { ICommonProps } from "~/interfaces/common";
import { useConfig } from "~/store";
import { H1 } from "~/components/atoms/headings";
import ImageCarousel from "~/components/molecules/imageCarousel";
import DynamicHead from "~/components/Document/DynamicHead";

interface IProps extends ICommonProps {
  productImages: Array<string>;
  product: IProductList;
}

const ProductDescription: NextPage<IProps> = ({ productImages, product }) => {
  const {
    config: {
      appSettings: { colors },
    },
  } = useConfig();
  const { price, details } = product.description;
  let detailsKeys = Object.keys(details || {});

  return (
    <>
      <DynamicHead
        title={product.title}
        description={product.aboutProduct.substring(0, 100)}
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
                Price -{" "}
                <span className="text-green-900"> &#x20B9;{price || ""}</span>
              </p>
              <div>
                <hr className="mt-4 mb-2" />

                <p>
                  {(product.aboutProduct || "")
                    .split("\n")
                    .map((str: string, index: number) => {
                      return (
                        <p
                          key={index}
                          className={`${
                            index === 0 ? "text-xl font-bold" : "text-lg"
                          }
                       `}
                        >
                          {str}
                        </p>
                      );
                    })}
                </p>
              </div>
              <hr className="mt-4" />
            </div>

            <div className="w-[100%]">
              <h1 className="font-bold text-2xl mb-4">Details</h1>

              {detailsKeys && (
                <table
                  // create a colorful gradient for the table
                  className="table-auto w-[100%] rounded-lg overflow-hidden shadow-lg my-4 border-collapse border-2 border-red-200 divide-y divide-red-200
                  hover:shadow-xl transition duration-300 ease-in-out hover:scale-105 transform hover:rotate-1 hover:cursor-pointer
                hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-300
                hover:text-lg hover:font-semi-bold
                  "
                >
                  <tbody className="bg-white divide-y divide-gray-200">
                    {detailsKeys?.map((Dkey: string, index: number) => (
                      //make gradient for each row using red and blue colors
                      <tr
                        className={`${
                          index % 2 === 0
                            ? "bg-gradient-to-r from-red-300 to-red-400"
                            : "bg-gradient-to-r from-blue-300 to-blue-400"
                        }`}
                        key={index}
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
        {/* <SectionContact showWave={true} waveColor={colors.secondary} /> */}
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
    name: (query.productId as string) || "",
  });

  if (!product || !product[0]) {
    return { notFound: true };
  }

  const images = product.map((prod: IProductList) => prod.images).flat();
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: {
      product: product[0],
      productImages: images,
    },
  };
};

export default ProductDescription;
