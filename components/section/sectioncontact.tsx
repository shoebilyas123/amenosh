import Link from 'next/link';
import React, { FC } from 'react';
import { H1 } from '../atoms/headings';
import Button from '../button';

const SectionContact: FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-24 bg-rose-200">
      <H1 className="text-zinc-900 px-24 text-center">
        We always welcome your enquries, feedback and suggestions.
      </H1>
      <Link href="/contact">
        <Button className="mt-8 ">Contact</Button>
      </Link>
    </div>
  );
};

export default SectionContact;
