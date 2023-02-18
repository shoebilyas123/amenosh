import Link from 'next/link';
import React, { FC } from 'react';
import { H1 } from '../atoms/headings';
import Button from '../atoms/button';

interface IProps {
  className?: string;
}

const SectionContact: FC<IProps> = ({ className }) => {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center p-12 ${
        className || ''
      }`}
      style={{
        background: '#91a9bf',
      }}
    >
      <h1 className="text-zinc-900 px-24 text-center xs:text-lg sm:text-xl md:text-4xl lg:text-6xl font-bold">
        We always welcome your enquiries, feedback and suggestions.
      </h1>
      <Link href="/contact">
        <Button className="mt-8 ">Contact</Button>
      </Link>
    </div>
  );
};

export default SectionContact;
