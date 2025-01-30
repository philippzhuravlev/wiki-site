import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import { WikiRenderer } from '@/components/wiki/WikiRenderer';
import { loadTextFile } from '@/lib/utils/file-utils';

interface PageProps {
  params: Promise<{ era: string; page: string }> | { era: string; page: string };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { era, page } = resolvedParams;
  
  try {
    // Load and validate metadata
    const metadataPath = path.join(process.cwd(), 'src', 'content', era, 'metadata.json');
    const metadataContent = await fs.readFile(metadataPath, 'utf8');
    const { regions } = JSON.parse(metadataContent);
    
    // Check if page exists in metadata
    const pageData = regions.find((r: any) => r.id === page);
    if (!pageData) {
      notFound();
    }

    // Load the content file
    const content = await loadTextFile(`src/content/${era}/${page}.txt`);
    
    return (
      <div className="text-black">
        {/* @ts-expect-error Async Component */}
        <WikiRenderer content={content} />
      </div>
    );
  } catch (error) {
    console.error('Error:', error);
    notFound();
  }
} 