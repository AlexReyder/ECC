import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server'
 

export const catalogSearchParams = {
  search:parseAsString,
  offset: parseAsInteger.withDefault(1),
  bands: parseAsString,
  genres: parseAsString,
  manufacturers: parseAsString,
  colors: parseAsString,
  sizes: parseAsString,

}
 
export const CatalogSearchParams = createLoader(catalogSearchParams)