// node_module imports
import React from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import Card from '~/components/card';
import DisplayCarousel from '~/components/molecules/displayCarousel';

// local Imports
import Navbar from '~/components/Navbar';
import { AboutBanner, Footer, SectionContact } from '~/components/section';
import { aboutCards } from 'constants/about';

const About = () => {
  return (
    <div>
      <Navbar />
      <AboutBanner />
      <div className="px-48 my-4">
        <div className="w-full flex justify-center">
          <p>Home / </p>
          <p className="text-rose-800">About</p>
        </div>

        <div className="flex flex-row items-start justify-around mt-8 w-full  ">
          <div className="flex flex-col items-start w-[45%]">
            <Fade triggerOnce={true}>
              <Slide direction="left" triggerOnce={true}>
                <h1 className="text-6xl text-zinc-900 mb-4">Heading 1</h1>
              </Slide>
            </Fade>
            <Fade triggerOnce={true}>
              <Slide direction="right" triggerOnce={true}>
                <p className="text-zinc-700">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum. <br />{' '}
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </Slide>
            </Fade>
          </div>
          <DisplayCarousel
            imgHeight={550}
            width={`[45%]`}
            height={`[550px]`}
            overlay={{
              isButton: true,
              text: 'Our Products',
              url: '/products',
            }}
            images={[
              `https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1989&q=80`,
              `https://images.unsplash.com/photo-1575224300306-1b8da36134ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80`,
              `https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80`,
            ]}
          />
        </div>
        <div
          id="about-display-cards"
          className="w-full px-4 grid grid-cols-3 items-center space-x-2 my-24"
        >
          {aboutCards.map(({ title, content }, index: number) => (
            <Card
              shadowSize="lg"
              style={{
                background: '#b4c7d9',
              }}
              className=" text-zinc-600 px-2 py-8 flex-col items-center justify-center"
            >
              <Fade cascade damping={0.2}>
                <h1 className="text-6xl font-bold text-zinc-900">{title}</h1>

                <Slide direction={index % 2 === 0 ? 'down' : 'up'}>
                  <p className="p-10">{content}</p>
                </Slide>
              </Fade>
            </Card>
          ))}
        </div>
      </div>
      <SectionContact />
      <Footer />
    </div>
  );
};

export default About;
