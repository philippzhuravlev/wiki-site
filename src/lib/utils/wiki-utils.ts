import { promises as fs } from 'fs';
import path from 'path';

export interface WikiLink {
  text: string;      // Display text
  slug: string;      // URL slug
  exists?: boolean;  // Whether the page exists
}

export function parseWikiLinks(content: string): { text: string, links: WikiLink[] } {
  const links: WikiLink[] = [];
  
  // Replace wiki links with markers and collect link information
  const processedText = content.replace(
    /\[\[(.*?)\]\]/g,
    (match, innerContent) => {
      // Split by | and handle both cases
      const parts = innerContent.split('|');
      let slug, displayText;
      
      if (parts.length === 2) {
        [slug, displayText] = parts;
      } else {
        slug = displayText = parts[0];
      }
      
      // Convert to URL-friendly slug
      const urlSlug = slug
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_-]/g, '');

      links.push({
        text: displayText.trim(),
        slug: urlSlug,
        exists: false // TODO: Check against database
      });

      // Return a marker that we'll replace with the actual link component
      return `{{WIKILINK:${links.length - 1}}}`;
    }
  );

  return { text: processedText, links };
}

// Utility function to load a .txt file as a string
export async function loadTextFile(filePath: string): Promise<string> {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    const content = await fs.readFile(fullPath, 'utf8');
    return content;
  } catch (error) {
    console.error(`Error loading file ${filePath}:`, error);
    throw error;
  }
}

interface RegionMetadata {
  id: string;
  equivalents: Record<string, string>;
}

export async function getEquivalentRegion(currentEra: string, targetEra: string, currentRegion: string): Promise<string | null> {
  try {
    const metadataPath = path.join(process.cwd(), 'src', 'content', currentEra, 'metadata.json');
    const metadataContent = await fs.readFile(metadataPath, 'utf8');
    const { regions } = JSON.parse(metadataContent);
    
    const currentRegionData = regions.find((r: RegionMetadata) => r.id === currentRegion);
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