import { ReactNode, FC } from 'react';

export interface ISectionProps {
  background: string;
  heading: string;
  content: string | ReactNode | FC;
  fallbackColor: string;
  showBG?: boolean | true;
  className?: string;
}
