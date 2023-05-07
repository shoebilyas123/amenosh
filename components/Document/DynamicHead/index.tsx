import Head from 'next/head';
import React, { FC } from 'react';

interface IProps {
  title: string;
  description: string;
  favicon?: string;
}

const DynamicHead: FC<IProps> = ({ title, description, favicon }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href={favicon} type="image/x-icon"></link>
    </Head>
  );
};

export default DynamicHead;
