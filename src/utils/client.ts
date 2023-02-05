import sanityClient from '@sanity/client';
// setting up our sanity client

export const client = sanityClient({
  projectId: '5knvjuq2',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
