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
        brand
      }
  }
  `;
  const { products } = await client.request(query);

  const transformedProduct = products.map(
    ({ name, id, images, brand }: any) => ({
      title: name,
      images: images.map((img: any) => img.url),
      id,
      brand,
    })
  );

  return transformedProduct;
};

export const getCandyWrappers = async () => {
  const query = `
  {
    assets(where: {groupName: "Candy Wrappers"}) {
      id
      url
    }
  }
  `;

  const { assets } = await client.request(query);
  return assets;
};

export const getAppConfig = async () => {
  const query = `
  {
    configs {
      appSettings
    }
  }
  `;
  const { configs } = await client.request(query);
  console.log({ configs });

  return configs[0];
};

export default client;
