import { promises as fs } from 'fs';
import path from 'path';

interface RegionMetadata {
  id: string;
  equivalents: Record<string, string>;
}

export async function getEquivalentRegion(currentEra: string, targetEra: string, currentRegion: string): Promise<string | null> {
  try {
    console.log('getEquivalentRegion called with:', { currentEra, targetEra, currentRegion });
    const metadataPath = path.join(process.cwd(), 'src', 'content', currentEra, 'metadata.json');
    console.log('Looking for metadata at:', metadataPath);
    const metadataContent = await fs.readFile(metadataPath, 'utf8');
    const { regions } = JSON.parse(metadataContent);
    console.log('Loaded regions:', regions);
    
    const currentRegionData = regions.find((r: RegionMetadata) => r.id === currentRegion);
    console.log('Found region data:', currentRegionData);
    if (!currentRegionData) return null;
    
    const equivalent = currentRegionData.equivalents[targetEra] || null;
    console.log('Found equivalent:', equivalent);
    return equivalent;
  } catch (error) {
    console.error('Error in getEquivalentRegion:', error);
    return null;
  }
} 