import { EraData, type Era } from '@/types/era';
import { notFound } from 'next/navigation';

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
    <div className="prose prose-brown max-w-none">
      <h1 className="text-text">{eraInfo.name}</h1>
      <p className="text-lg text-text">{eraInfo.description}</p>
      <p className="text-sm text-text-light">Years: {eraInfo.yearRange}</p>
    </div>
  );
} 