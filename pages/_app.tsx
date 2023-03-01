import { FC, useEffect, useRef } from 'react';
import type { AppProps, AppContext } from 'next/app';
import { ParallaxProvider } from 'react-scroll-parallax';

import '../styles/globals.css';
import 'swiper/css';
import { getAppConfig } from '~/lib/graphcms';
import { GetServerSideProps } from 'next';
import { ConfigProvider } from '~/store';

function MyApp({ Component, pageProps }: AppProps<{ config: any }>) {
  return (
    <ParallaxProvider>
      <ConfigProvider config={pageProps.config}>
        <Component {...pageProps} />
      </ConfigProvider>
    </ParallaxProvider>
  );
}

MyApp.getInitialProps = async () => {
  const config = await getAppConfig();
  return {
    pageProps: { config },
  };
};

export default MyApp;
