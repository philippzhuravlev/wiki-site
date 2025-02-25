'use client';

import { useState, useEffect } from 'react';

interface SearchResult {
  title: string;
  content: string;
  path: string; // Path to the page
  era: string; // Add era to the interface
}

export function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [allPages, setAllPages] = useState<SearchResult[]>([]);

  useEffect(() => {
    // Fetch all pages' titles and content
    const fetchPages = async () => {
      const response = await fetch('/api/search'); // Create this API endpoint
      const data = await response.json();
      setAllPages(data.pages);
    };

    fetchPages();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Filter results based on query
    const filteredResults = allPages.filter(page =>
      page.title.toLowerCase().includes(value.toLowerCase()) ||
      page.content.toLowerCase().includes(value.toLowerCase())
    );

    setResults(filteredResults);
  };

  // Map era IDs to their display names
  const getEraDisplayName = (eraId: string) => {
    // Capitalize first letter of the era ID
    const capitalizedEraId = eraId.charAt(0).toUpperCase() + eraId.slice(1);
    
    switch (capitalizedEraId) {
      case 'Golden':
        return 'Golden Period';
      case 'Steel':
        return 'Steel Era';
      case 'Coal':
        return 'Coal Age';
      default:
        return capitalizedEraId; // Return capitalized version if no match
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search..."
        className="search-input text-black"
      />
      {results.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {results.map((result) => (
            <li key={result.path}>
              <a href={result.path} className="block px-4 py-2 text-black hover:bg-gray-100">
                {/* Capitalize the first letter of each word in the title */}
                {result.title.split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
                {' '}
                <span className="text-gray-500">({getEraDisplayName(result.path.split('/')[1])})</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 