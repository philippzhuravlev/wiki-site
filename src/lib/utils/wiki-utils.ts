import fs from 'fs';
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
export const loadTextFile = (filePath: string): string => {
    const fullPath = path.join(process.cwd(), filePath);
    return fs.readFileSync(fullPath, 'utf-8'); // Read the file as a string
}; 