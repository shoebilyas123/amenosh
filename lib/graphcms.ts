import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(process.env.HYGRAPH_URL || '');
client.setHeader(
  'Authorization',
  `Bearer ${process.env.HYGRAPH_PERMANENTAUTH_TOKEN}`
);

export const getProductList = async ({
  name,
  brand,
  productId,
}: {
  name?: string;
  brand?: string;
  productId?: string;
}) => {
  const query = `
  {
      products(where:{name_contains: "${name || ''}" ${
    brand ? `, brand: "${brand || ''}"` : ''
  } ${productId ? `, id: "${productId}"` : ''} }) {
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
        description
        aboutProduct
      }
  }
  `;
  const { products } = await client.request(query);

  const transformedProduct = products.map(
    ({ name, id, images, brand, description, aboutProduct }: any) => ({
      title: name,
      images: images.map((img: any) => img.url),
      id,
      brand,
      description: description || {},
      aboutProduct,
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

  return configs[0];
};

export const getContentControls = async () => {
  const query = `
  {
    contentControls {
      id
      welcomeContent
      bannerImage {
        id
        url
      }
      aboutContent
      phone
      address
      email
      workingHoursTimings
      workingHoursDays
      welcomeTitle
      aboutTitle
      favicon {
        url
      }
    }
  }
  `;

  const { contentControls } = await client.request(query);
  const transformContentControl = contentControls.map(
    ({
      id,
      welcomeContent,
      aboutContent,
      bannerImage,
      phone,
      email,
      address,
      workingHoursTimings,
      workingHoursDays,
      welcomeTitle,
      aboutTitle,
      favicon,
    }: any) => ({
      id,
      welcomeContent,
      aboutContent,
      bannerImage: bannerImage.url,
      phone,
      email,
      address,
      workingHoursTimings,
      workingHoursDays,
      welcomeTitle,
      aboutTitle,
      favicon: favicon.url,
    })
  )[0];

  return transformContentControl;
};

export default client;

export const getMarketplaces = async () => {
  const query = `
  {
    marketplaces {
      id
      url
      name
    }
  }
  `;

  const { marketplaces } = await client.request(query);

  return marketplaces;
};

export const getFontControls = async () => {
  const query = `
  {
    fontControls {
      id
      aboutTitleItalics
      aboutContentItalics
      navbarLinksItalics
      welcomeContentItalics
      welcomeTitleItalics
    }
  }`;

  const { fontControls } = await client.request(query);

  return fontControls[0] || {};
};
