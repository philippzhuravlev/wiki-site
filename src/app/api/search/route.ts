import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

async function getAllPages() {
  const pages: Array<{ title: string; content: string; path: string }> = [];
  const eras = ['golden', 'steel', 'coal'];

  for (const era of eras) {
    const eraPath = path.join(process.cwd(), 'src', 'content', era);
    const files = await fs.readdir(eraPath);

    for (const file of files) {
      if (file.endsWith('.txt')) {
        const filePath = path.join(eraPath, file);
        const content = await fs.readFile(filePath, 'utf8');
        const title = file.replace('.txt', ''); // Assuming the title is the filename

        // Adjust the path for frontpage
        const pagePath = title.toLowerCase() === 'frontpage' ? `/${era}` : `/${era}/${title}`;

        pages.push({
          title,
          content,
          path: pagePath, // Use the adjusted path
        });
      }
    }
  }

  return pages;
}

export async function GET() {
  const pages = await getAllPages();
  return NextResponse.json({ pages });
} 