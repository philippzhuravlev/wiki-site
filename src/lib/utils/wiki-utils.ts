export interface WikiLink {
  text: string;      // Display text
  slug: string;      // URL slug
  exists?: boolean;  // Whether the page exists
}


export function getEraNavigationUrl(targetEra: string, currentEra: string | undefined, currentRegion: string | undefined, hash: string = ''): string {
  if (!currentEra || !currentRegion || currentEra === targetEra) {
    return `/${targetEra}${hash}`;
  }
  
  return `/${targetEra}/${currentRegion}${hash}`;
} 