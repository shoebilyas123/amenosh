import { useState } from 'react';

const useMouseEnterLeave = () => {
  const [activeFor, setActiveFor] = useState<string | number>();
  const onMouseEnter = (target: number | string) => {
    setActiveFor(target);
  };

  const onMouseLeave = (target: number | string) => {
    setActiveFor('');
  };

  return {
    activeFor,
    onMouseEnter,
    onMouseLeave,
  };
};
export default useMouseEnterLeave;
