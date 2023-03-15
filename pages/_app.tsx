import { FC, useEffect, useRef } from 'react';
import type { AppProps, AppContext } from 'next/app';

import 'swiper/css';
import {
  getAppConfig,
  getContentControls,
  getMarketplaces,
} from '~/lib/graphcms';
import { ConfigProvider } from '~/store';
import '~/styles/globals.css';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps<{ config: any }>) {
  return (
    <>
      <ConfigProvider config={pageProps.config}>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-76CQVZDDBX`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
         
           gtag('config', 'G-76CQVZDDBX');`}
        </Script>
        <Component {...pageProps} />
      </ConfigProvider>
    </>
  );
}

MyApp.getInitialProps = async () => {
  const { appSettings } = await getAppConfig();
  const contentControls = await getContentControls();
  const marketplaces = await getMarketplaces();
  const config = { contentControls, appSettings, marketplaces };

  return {
    pageProps: { config },
  };
};

export default MyApp;
