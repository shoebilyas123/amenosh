import { useRef } from 'react';
import type { AppProps, AppContext } from 'next/app';
import { Provider } from 'react-redux';
import { ParallaxProvider } from 'react-scroll-parallax';

import '../styles/globals.css';
import 'swiper/css';
import { getAppConfig } from '~/lib/graphcms';

function MyApp({ Component, pageProps }: AppProps<{ config: any }>) {
  return (
    <ParallaxProvider>
      <Component {...pageProps} />
    </ParallaxProvider>
  );
}

MyApp.getInitialProps = async (ctx: AppContext) => {
  const config = await getAppConfig();
  return {
    pageProps: { config },
  };
};
export default MyApp;
