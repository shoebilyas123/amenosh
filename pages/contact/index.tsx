import React, { FC } from 'react';

import Navbar from '~/components/Navbar';
import Footer from '~/components/section/footer';
import Contact from '~/components/section/contact';
import { ICommonProps } from '~/interfaces/common';
import { GetServerSideProps, NextPage } from 'next';
import DynamicHead from '~/components/Document/DynamicHead';

const ContactUs: NextPage<ICommonProps> = ({}) => {
  return (
    <>
      <DynamicHead
        title={'Contact Amenosh'}
        description={
          'We always welcome your enquiries, feedback, and suggestions.'
        }
      />
      <body
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1024%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='rgba(243%2c 249%2c 255%2c 1)'%3e%3c/rect%3e%3cpath d='M1319.623%2c492.392C1347.559%2c492.667%2c1366.043%2c465.623%2c1378.012%2c440.38C1388.125%2c419.052%2c1387.731%2c394.598%2c1375.593%2c374.354C1363.806%2c354.696%2c1342.513%2c344.187%2c1319.623%2c342.996C1294.096%2c341.668%2c1265.498%2c345.904%2c1252.57%2c367.956C1239.545%2c390.171%2c1250.974%2c416.58%2c1263.19%2c439.25C1276.327%2c463.63%2c1291.93%2c492.12%2c1319.623%2c492.392' fill='rgba(255%2c 45%2c 45%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M1368.744144771588 604.2650296236632L1453.146000494147 614.6282744179479 1426.4899398242947 482.843868436967z' fill='rgba(255%2c 45%2c 45%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M159.16741550140986 408.4267360491538L48.48911141448339 523.0374750100968 163.09985037542646 633.7157790970234 273.7781544623529 519.1050401360803z' fill='rgba(255%2c 45%2c 45%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M199.28912419869215 422.8621829910431L249.41141873195204 386.44620441141916 169.7263035958862 329.4707519013413z' fill='rgba(255%2c 45%2c 45%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M802.3852925565019 289.2396536287117L947.5338281669978 273.9839277934378 787.1295667212279 144.0911180182159z' fill='rgba(255%2c 45%2c 45%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M1333.9822847285268 182.63731097780985L1383.4906550699272 89.52560862057052 1240.8705823712876 133.12894063640934z' fill='rgba(255%2c 45%2c 45%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M352.661%2c145.371C380.335%2c145.284%2c399.533%2c121.731%2c414.105%2c98.204C429.811%2c72.845%2c445.254%2c43.615%2c432.339%2c16.727C418.073%2c-12.973%2c385.541%2c-31.844%2c352.661%2c-29.715C322.513%2c-27.763%2c302.219%2c-1.186%2c289.055%2c26.006C277.753%2c49.352%2c278.348%2c75.701%2c290.546%2c98.592C303.611%2c123.109%2c324.88%2c145.458%2c352.661%2c145.371' fill='rgba(255%2c 45%2c 45%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M218.4895246252742 369.3273917896382L240.3348143017629 231.4016610061926 102.40908351831726 209.55637132970392 80.56379384182858 347.48210211314955z' fill='rgba(255%2c 45%2c 45%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M-74.76 296.48 a150 150 0 1 0 300 0 a150 150 0 1 0 -300 0z' fill='rgba(255%2c 45%2c 45%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1024'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cstyle%3e %40keyframes float1 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-10px%2c 0)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float1 %7b animation: float1 5s infinite%3b %7d %40keyframes float2 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-5px%2c -5px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float2 %7b animation: float2 4s infinite%3b %7d %40keyframes float3 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(0%2c -10px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float3 %7b animation: float3 6s infinite%3b %7d %3c/style%3e%3c/defs%3e%3c/svg%3e");`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="w-screen overflow-hidden">
          <Navbar textColor="LIGHT" isFixed={false} />
          <Contact />
          <Footer />
        </div>
      </body>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  return { props: {} };
};

export default ContactUs;
