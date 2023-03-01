import Link from 'next/link';
import React, { FC, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { useConfig } from '~/store';
import { navItems } from '.';

interface IProps {
  onClick: () => void;
}

const FullScreenMenu: FC<IProps> = ({ onClick }) => {
  const { config } = useConfig();
  const [hoverOn, setHoverOn] = useState<number | undefined>(undefined);

  const onMouseEnter = (index: number) => setHoverOn(index);
  const onMouseLeave = () => setHoverOn(undefined);

  return (
    <div
      className="fixed  h-screen flex flex-col w-screen  items-center justify-start pt-12 left-0"
      style={{
        background: '#fff' || config.appSettings?.colors.navbarColor,
        zIndex: '999999',
      }}
    >
      {navItems.map((item, index) => (
        <Fade triggerOnce={false} key={item.name}>
          <Link href={item.path} onClick={onClick}>
            <div className="flex px-4 py-2 items-center">
              <p
                className={`text-neutral-900 text-lg px-1 hover:scale-125  transition-all cursor-pointer`}
                style={{
                  ...(hoverOn !== undefined && hoverOn === index
                    ? { color: config.appSettings.colors.navbarColor }
                    : {}),
                }}
                onMouseEnter={() => onMouseEnter(index)}
                onMouseLeave={onMouseLeave}
              >
                {item.name}
              </p>
            </div>
          </Link>
        </Fade>
      ))}{' '}
    </div>
  );
};

export default FullScreenMenu;
