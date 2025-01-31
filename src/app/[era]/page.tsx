import { EraData, type Era } from '@/types/era';
import { notFound } from 'next/navigation';
import { loadTextFile } from '@/lib/utils/file-utils';
import { renderWikiContent } from '@/lib/utils/render-utils';

interface EraPageProps {
  params: Promise<{ era: string }>;
}

export default async function EraPage({ params }: EraPageProps) {
  const { era } = await params;
  
  // Type guard to validate era
  const isValidEra = (era: string): era is Era => {
    return Object.values(EraData).some(e => e.id === era);
  };

  if (!isValidEra(era)) {
    notFound();
  }

  // Load the frontpage.txt content for the respective era
  const content = loadTextFile(`src/content/${era}/frontpage.txt`);

  return (
    <div className="text-black">
      {await renderWikiContent(content)}
    </div>
  );
} 


