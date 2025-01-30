import React from 'react';
import ReactMarkdown from 'react-markdown'; // Temporary, will replace with WikiText

interface WikiRendererProps {
  content: string;
}

export function WikiRenderer({ content }: WikiRendererProps) {
  // This will be replaced with WikiText parser later
  return (
    <div className="prose prose-brown max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
} 