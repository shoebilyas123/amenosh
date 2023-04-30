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
      <link rel="icon" href="/images/favicon.png" type="image/x-icon"></link>
      <meta name="description" content={description} />
    </Head>
  );
};

export default DynamicHead;
