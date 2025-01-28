import Link from 'next/link';
import Image from 'next/image';

export function Sidebar() {
  return (
    <aside className="w-48 h-screen fixed left-0 top-0 bg-surface border-r border-border flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center p-2 pl-8">
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <Image
            src="/favicon.ico"
            alt="Fantasy World Wiki Logo"
            width={160}
            height={160}
            className="rounded-lg"
            priority
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 p-4">
        <Link 
          href="/"
          className="px-4 py-2 rounded-md text-text hover:bg-surface-dark/5 hover:text-primary transition-colors"
        >
          Main Page
        </Link>
        <Link 
          href="/random"
          className="px-4 py-2 rounded-md text-text hover:bg-surface-dark/5 hover:text-primary transition-colors"
        >
          Random Page
        </Link>
      </nav>
    </aside>
  );
} 