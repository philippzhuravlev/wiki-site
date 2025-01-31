'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

export function RandomButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRandomClick = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      const response = await fetch('/api/random');
      const data = await response.json();
      router.push(data.redirect);
    } catch (error) {
      console.error('Error fetching random page:', error);
      router.push('/');
    } finally {
      setIsLoading(false);
    }
  }, [router, isLoading]);

  return (
    <a 
      href="#"
      onClick={handleRandomClick}
      className={`px-4 py-2 rounded-md text-text hover:bg-surface-dark/5 hover:text-primary transition-colors ${
        isLoading ? 'opacity-50 cursor-wait' : ''
      }`}
    >
      {isLoading ? 'Loading...' : 'Random Page'}
    </a>
  );
} 