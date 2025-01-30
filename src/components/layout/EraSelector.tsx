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
  'golden': { id: 'golden', name: 'Golden Period', yearRange: '1200-1400' },
  'steel': { id: 'steel', name: 'Steel Era', yearRange: '1400-1600' },
  'coal': { id: 'coal', name: 'Coal Age', yearRange: '1600-1800' }
};

export function EraSelector() {
  const params = useParams();
  const currentEra = params.era as string;
  const currentPage = params.page as string;
  const hash = typeof window !== 'undefined' ? window.location.hash : '';
  const [eraLinks, setEraLinks] = useState<Record<string, string>>({});

  useEffect(() => {
    async function updateEraLinks() {
      console.log('updateEraLinks running with:', { currentEra, currentPage });
      const links: Record<string, string> = {};
      
      for (const targetEra of Object.keys(EraData)) {
        if (currentPage && currentEra !== targetEra) {
          console.log('Looking up equivalent for:', { currentEra, targetEra, currentPage });
          
          const response = await fetch(
            `/api/equivalent-region?currentEra=${currentEra}&targetEra=${targetEra}&currentPage=${currentPage}`
          );
          const data = await response.json();
          console.log('API response:', data);

          links[targetEra] = data.equivalent 
            ? `/${targetEra}/${data.equivalent}${hash}`
            : `/${targetEra}`;
        } else {
          links[targetEra] = `/${targetEra}`;
        }
      }
      
      console.log('Final eraLinks:', links);
      setEraLinks(links);
    }

    updateEraLinks();
  }, [currentEra, currentPage, hash]);

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