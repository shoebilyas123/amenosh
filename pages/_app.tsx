import { FC, useEffect, useRef } from 'react';
import type { AppProps, AppContext } from 'next/app';

import 'swiper/css';
import { getAppConfig } from '~/lib/graphcms';
import { ConfigProvider } from '~/store';
import '~/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps<{ config: any }>) {
  return (
    <>
      <ConfigProvider config={pageProps.config}>
        <Component {...pageProps} />
      </ConfigProvider>
    </>
  );
}

MyApp.getInitialProps = async () => {
  const config = await getAppConfig();

  return {
    pageProps: { config },
  };
};

export default MyApp;
