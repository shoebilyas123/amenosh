import axios from 'axios';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import useLoading from '~/hooks/useLoading';
import { IProductList } from '~/interfaces/product';

interface IParams {
  brand: string;
}

const useData = ({ brand }: IParams) => {
  const [brandProducts, setBrandProducts] = useState<IProductList[]>([]);
  const { loading, startloading, stoploading } = useLoading();

  const fetchData = async () => {
    if (loading) return;
    try {
      startloading();
      const { data } = await axios.post('/api/products/list');
      console.log({ data });
      setBrandProducts(data);
      console.log({ brandProducts });
      stoploading();
    } catch (error) {
      stoploading();
    }
  };

  useEffect(() => {
    if (!brand || brandProducts.length > 0) return;

    fetchData();
  }, [brand]);

  return {
    state: { brandProducts, loading },
    setters: { setBrandProducts },
    actions: { fetchData },
  };
};

export default useData;
