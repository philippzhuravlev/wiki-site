'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

interface EraInfo {
  id: string;
  name: string;
  yearRange: string;
}

const EraData: Record<string, EraInfo> = {
  'golden': { id: 'golden', name: 'Golden Period', yearRange: '500-800' },
  'steel': { id: 'steel', name: 'Steel Era', yearRange: '1000-1500' },
  'coal': { id: 'coal', name: 'Coal Age', yearRange: '1800-1900' }
};

export function EraSelector() {
  const params = useParams();
  const currentEra = params?.path?.[0];
  const currentRegion = params?.path?.[1];
  const currentPage = params.page as string;
  const hash = typeof window !== 'undefined' ? window.location.hash : '';
  const [eraLinks, setEraLinks] = useState<Record<string, string>>({});

  useEffect(() => {
    async function updateEraLinks() {
      const links: Record<string, string> = {};
      
      for (const targetEra of Object.keys(EraData)) {
        if (currentRegion && currentEra && targetEra !== currentEra) {
          const response = await fetch(
            `/api/equivalent?currentRegion=${currentRegion}&currentEra=${currentEra}&targetEra=${targetEra}`
          );
          const data = await response.json();
          links[targetEra] = data.equivalent 
            ? `/${targetEra}/${data.equivalent}`
            : `/${targetEra}`;
        } else {
          links[targetEra] = `/${targetEra}`;
        }
      }
      
      setEraLinks(links);
    }

    updateEraLinks();
  }, [currentEra, currentRegion]);

  const getEraLink = async (targetEra: string) => {
    if (targetEra === currentEra || !currentRegion) {
      return `/${targetEra}`;
    }

    const response = await fetch(
      `/api/equivalent?currentEra=${currentEra}&targetEra=${targetEra}&currentRegion=${currentRegion}`
    );
    const data = await response.json();
    
    return data.equivalent 
      ? `/${targetEra}/${data.equivalent}`
      : `/${targetEra}`;
  };

  return (
    <div className="flex gap-2 px-4">
      {Object.values(EraData).map((era) => (
        <a
          key={era.id}
          href={eraLinks[era.id] || `/${era.id}`}
          className={clsx(
            'px-4 py-2 rounded-md transition-colors cursor-pointer',
            currentEra === era.id
              ? 'bg-primary text-surface hover:bg-primary/90'
              : 'hover:bg-surface-dark/5 text-text hover:text-primary'
          )}
        >
          <span className="font-medium">{era.name}</span>
          <span className="text-xs ml-2 opacity-70">{era.yearRange}</span>
        </a>
      ))}
    </div>
  );
} 