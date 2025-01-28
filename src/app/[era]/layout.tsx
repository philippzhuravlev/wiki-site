import { notFound } from 'next/navigation';
import { EraData, type Era } from '@/types/era';

interface EraLayoutProps {
  children: React.ReactNode;
  params: Promise<{ era: string }> | { era: string };
}

export default async function EraLayout({
  children,
  params,
}: EraLayoutProps) {
  const resolvedParams = await params;
  
  // Type guard to validate era
  const isValidEra = (era: string): era is Era => {
    return Object.values(EraData).some(e => e.id === era);
  };

  if (!isValidEra(resolvedParams.era)) {
    notFound();
  }

  return children;
}

// Generate static params for all eras
export function generateStaticParams() {
  return Object.values(EraData).map((era) => ({
    era: era.id,
  }));
} 