import type { AppProps } from 'next/app';

import 'swiper/css';
import {
  getAppConfig,
  getContentControls,
  getFontControls,
  getMarketplaces,
} from '~/lib/graphcms';
import { ConfigProvider } from '~/store';
import '~/styles/globals.css';
import Script from 'next/script';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps<{ config: any }>) {
  return (
    <div className="w-[100%] overflow-hidden">
      <ConfigProvider config={pageProps.config}>
        <Head>
          <meta
            name="google-site-verification"
            content="v7AvEbWI_Co9Ir7GL1JmSju94D1ECUUlytKDasNiRkc"
          />
          <link
            rel="icon"
            href={'/images/favicon.png'}
            type="image/x-icon"
          ></link>
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
    </div>
  );
}

MyApp.getInitialProps = async () => {
  const { appSettings } = await getAppConfig();
  const contentControls = await getContentControls();
  const marketplaces = await getMarketplaces();
  const fontControls = await getFontControls();
  const config = { contentControls, appSettings, marketplaces, fontControls };

  return {
    pageProps: { config },
  };
};

export default MyApp;
