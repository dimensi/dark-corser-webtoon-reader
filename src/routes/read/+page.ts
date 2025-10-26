import type { PageLoad } from './$types';

export const ssr = false;

export const load: PageLoad = async ({ url }) => {
  const src = url.searchParams.get('src') ?? '';
  return { src };
};
