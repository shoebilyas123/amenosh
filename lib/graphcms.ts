import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(process.env.HYGRAPH_URL || '');
client.setHeader(
  'Authorization',
  `Bearer ${process.env.HYGRAPH_PERMANENTAUTH_TOKEN}`
);

export const getProductList = async ({
  name,
  brand,
}: {
  name?: string;
  brand?: string;
}) => {
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

  return transformedProduct;
};

export default client;
