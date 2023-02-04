import { useState } from 'react';

const useToggler = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    open,
    close,
    isOpen,
  };
};

export default useToggler;
