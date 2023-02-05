import { NextApiRequest, NextApiResponse } from 'next';
import client from '~/lib/graphcms';

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

    const query = `
        {
            products(where:{name_contains: "${name || ''}"${
      brand ? `, brand: ${brand || ''}` : ''
    }}) {
              createdAt
              displayOnPage
              id
              publishedAt
              updatedAt
              name
              images {
                url
              }
            }
        }
        `;
    const { products } = await client.request(query);

    const transformedProduct = products.map(({ name, id, images }: any) => ({
      title: name,
      images: images.map((img: any) => img.url),
      id,
    }));

    return res.json(transformedProduct);
  } catch (error) {
    return res.json({ message: 'Internal server error' });
  }
};
