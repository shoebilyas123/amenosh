import type { AppProps } from 'next/app';

import 'swiper/css';
import {
  getAppConfig,
  getContentControls,
  getMarketplaces,
} from '~/lib/graphcms';
import { ConfigProvider } from '~/store';
import '~/styles/globals.css';
import Script from 'next/script';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps<{ config: any }>) {
  return (
    <>
      <ConfigProvider config={pageProps.config}>
        <Head>
          <meta name="google-site-verification" content="VERIFICATION_ID" />
        </Head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-C43K6BEB3M`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
         
           gtag('config', 'G-C43K6BEB3M');`}
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
