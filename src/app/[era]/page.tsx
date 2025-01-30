import { EraData, type Era } from '@/types/era';
import { Content } from 'next/font/google';
import { notFound } from 'next/navigation';
import { WikiRenderer } from '@/components/wiki/WikiRenderer';

interface EraPageProps {
  params: Promise<{ era: string }> | { era: string };
}

export default async function EraPage({ params }: EraPageProps) {
  const resolvedParams = await params;
  
  // Type guard to validate era
  const isValidEra = (era: string): era is Era => {
    return Object.values(EraData).some(e => e.id === era);
  };

  if (!isValidEra(resolvedParams.era)) {
    notFound();
  }

  const eraInfo = EraData[resolvedParams.era];
  
  return (
    <WikiRenderer content={eraInfo.description} />
  );
} 


