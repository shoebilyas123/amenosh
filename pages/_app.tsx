import { FC, useEffect, useRef } from 'react';
import type { AppProps, AppContext } from 'next/app';

import 'swiper/css';
import { getAppConfig, getContentControls } from '~/lib/graphcms';
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
  const { appSettings } = await getAppConfig();
  const contentControls = await getContentControls();
  const config = { contentControls, appSettings };

  return {
    pageProps: { config },
  };
};

export default MyApp;
