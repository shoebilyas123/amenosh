import { useState } from 'react';

const useLoading = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const startloading = () => setLoading(true);
  const stoploading = () => setLoading(false);

  return {
    loading,
    startloading,
    stoploading,
  };
};

export default useLoading;
