import Link from 'next/link';
import { EraSelector } from './EraSelector';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-10">
          <Link 
            href="/" 
            className="text-xl font-bold px-4 text-text hover:text-primary transition-colors"
          >
            Urheimat
          </Link>
          <EraSelector />
        </div>
      </div>
    </header>
  );
} 