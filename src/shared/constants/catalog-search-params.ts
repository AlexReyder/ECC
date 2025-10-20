import { createLoader, parseAsInteger, parseAsString } from "nuqs/server";

export const catalogSearchParams = {
  search: parseAsString,
  offset: parseAsInteger.withDefault(1),
  colors: parseAsString,
  sizes: parseAsString,
};

export const CatalogSearchParams = createLoader(catalogSearchParams);

