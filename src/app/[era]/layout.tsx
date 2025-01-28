import { notFound } from 'next/navigation';
import { EraData, type Era } from '@/types/era';

export default function EraLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { era: string };
}) {
  // Validate that the era exists
  if (!Object.values(EraData).some(e => e.id === params.era)) {
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