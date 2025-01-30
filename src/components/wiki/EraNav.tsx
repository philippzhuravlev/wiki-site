'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export function EraNav() {
  const params = useParams();
  const currentEra = params.era as string;
  const currentRegion = params.region as string;
  const hash = typeof window !== 'undefined' ? window.location.hash : '';
  const [eraLinks, setEraLinks] = useState<Record<string, string>>({});

  useEffect(() => {
    async function updateEraLinks() {
      console.log('updateEraLinks running with:', { currentEra, currentRegion });
      const links: Record<string, string> = {};
      
      for (const targetEra of ['golden', 'steel', 'coal']) {
        if (currentRegion && currentEra !== targetEra) {
          console.log('Looking up equivalent for:', { currentEra, targetEra, currentRegion });
          
          const response = await fetch(
            `/api/equivalent-region?currentEra=${currentEra}&targetEra=${targetEra}&currentRegion=${currentRegion}`
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
  }, [currentEra, currentRegion, hash]);

  return (
    <nav className="flex gap-4 justify-center p-4">
      {['golden', 'steel', 'coal'].map((era) => (
        <Link
          key={era}
          href={eraLinks[era] || `/${era}`}
          className={`text-text hover:text-text-light ${
            currentEra === era ? 'font-bold' : ''
          }`}
        >
          {era.charAt(0).toUpperCase() + era.slice(1)}
        </Link>
      ))}
    </nav>
  );
} 