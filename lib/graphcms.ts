import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(process.env.HYGRAPH_URL || '');
client.setHeader(
  'Authorization',
  `Bearer ${process.env.HYGRAPH_PERMANENTAUTH_TOKEN}`
);

const RETURN_TYPE_CONSTANTS = {
  ARRAY: 'ARRAY',
  OBJECT: 'OBJECT',
};

const cmsExceptionHandler = (
  func: Function,
  returnType: 'ARRAY' | 'OBJECT' | undefined
) =>
  func()
    .then((res: any) => res)
    .catch(() =>
      returnType === 'ARRAY' ? [] : returnType === 'OBJECT' ? {} : null
    );

export const getProductList = ({ ...params }: any) =>
  cmsExceptionHandler(async () => {
    const { name, brand, productId } = params;
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
  }, 'ARRAY');

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

export const getAppConfig = () =>
  cmsExceptionHandler(async () => {
    const query = `
  {
    configs {
      appSettings
    }
  }
  `;
    const { configs } = await client.request(query);

    return configs[0];
  }, 'OBJECT');

export const getContentControls = () =>
  cmsExceptionHandler(async () => {
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
      })
    )[0];

    return transformContentControl;
  }, 'OBJECT');

export const getMarketplaces = () =>
  cmsExceptionHandler(async () => {
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
  }, 'ARRAY');

export const getFontControls = () =>
  cmsExceptionHandler(async () => {
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
  }, 'OBJECT');

export default client;
