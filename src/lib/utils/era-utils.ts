import { promises as fs } from 'fs';
import path from 'path';

export interface RegionData {
  id: string;
  equivalents: Record<string, string>;
}

export async function getEquivalentRegion(currentRegion: string, currentEra: string, targetEra: string): Promise<string | null> {
  try {
    const metadataPath = path.join(process.cwd(), 'src', 'content', currentEra, 'metadata.json');
    const metadataContent = await fs.readFile(metadataPath, 'utf8');
    const { regions } = JSON.parse(metadataContent);
    
    const currentRegionData = regions.find((r: RegionData) => r.id === currentRegion);
    if (!currentRegionData) return null;
    
    return currentRegionData.equivalents[targetEra] || null;
  } catch (error) {
    console.error('Error finding equivalent region:', error);
    return null;
  }
}

export function getEraNavigationUrl(targetEra: string, currentEra: string | undefined, currentRegion: string | undefined, hash: string = ''): string {
  if (!currentEra || !currentRegion || currentEra === targetEra) {
    return `/${targetEra}${hash}`;
  }
  return `/${targetEra}/${currentRegion}${hash}`;
} 