import axios from 'axios';
import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

import useLoading from '~/hooks/useLoading';
import { IProductList } from '~/interfaces/product';

const useData = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [productList, setProductList] = useState<IProductList[]>([]);
  const { loading, startloading, stoploading } = useLoading();
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchData = debounce(async () => {
    if (loading || !searchValue) {
      return;
    }

    try {
      startloading();
      const { data } = await axios.post('/api/products/list', {
        name: searchValue,
      });
      setProductList(data);
      stoploading();
    } catch (error) {
      stoploading();
    }
  }, 1500);

  useEffect(() => {
    if (loading || !searchValue) return;
    else fetchData();
  }, [searchValue]);

  const state = {
    searchValue,
    loading,
    productList,
  };

  const setters = {
    setSearchValue,
    startloading,
    stoploading,
  };

  const actions = {
    fetchData,
  };

  return { state, setters, actions };
};

export default useData;
