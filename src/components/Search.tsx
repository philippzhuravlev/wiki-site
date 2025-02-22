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
                {result.title} <span className="text-gray-500">({result.path.split('/')[1]})</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 