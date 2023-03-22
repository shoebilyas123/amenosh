import Head from 'next/head';
import React, { FC } from 'react';

interface IProps {
  title: string;
  description: string;
}

const DynamicHead: FC<IProps> = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
};

export default DynamicHead;
