import { promises as fs } from 'fs';
import path from 'path';

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