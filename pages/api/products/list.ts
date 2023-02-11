import { NextApiRequest, NextApiResponse } from 'next';
import client, { getProductList } from '~/lib/graphcms';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.json({ message: 'Method not allowed' });
  }
  return await handler(req, res);
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const name = req.body.name;
    const brand = req.body.brand;

    const transformedProduct = await getProductList({ name, brand });

    return res.json(transformedProduct);
  } catch (error) {
    return res.json({ message: 'Internal server error' });
  }
};
