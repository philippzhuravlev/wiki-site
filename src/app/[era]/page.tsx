import { EraData, type Era } from '@/types/era';

export default function EraPage({ params }: { params: { era: Era } }) {
  const eraInfo = EraData[params.era];

  return (
    <div className="prose prose-brown max-w-none">
      <h1 className="text-text">{eraInfo.name}</h1>
      <p className="text-lg text-text">{eraInfo.description}</p>
      <p className="text-sm text-text-light">Years: {eraInfo.yearRange}</p>
    </div>
  );
} 