import Link from 'next/link';
import { useParams } from 'next/navigation';

export function EraNav() {
  const params = useParams();
  const currentEra = params.era as string;

  return (
    <nav className="flex gap-4 justify-center p-4">
      {['golden-period', 'steel-era', 'coal-age'].map((era) => (
        <Link
          key={era}
          href={currentEra === era ? `/${era}` : `/${era}`}
          className={`text-text hover:text-text-light ${
            currentEra === era ? 'font-bold' : ''
          }`}
        >
          {era.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')}
        </Link>
      ))}
    </nav>
  );
} 