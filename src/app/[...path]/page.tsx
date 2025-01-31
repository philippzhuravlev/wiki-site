import { notFound } from 'next/navigation';
import { loadTextFile } from '@/lib/utils/file-utils';
import { renderWikiContent } from '@/lib/utils/render-utils';

interface PageProps {
  params: { path: string[] };
}

export default async function ContentPage({ params }: PageProps) {
  const { path } = params;
  
  // Don't handle era routes
  if (['golden', 'steel', 'coal'].includes(path[0])) {
    notFound();
    return;
  }

  // Single path segment like /about
  const pagePath = path.join('/');
  
  try {
    const content = await loadTextFile(`src/content/${pagePath}.txt`);
    return (
      <div className="text-black">
        {await renderWikiContent(content)}
      </div>
    );
  } catch (error) {
    console.error('Error loading:', pagePath, error);
    notFound();
  }
} 