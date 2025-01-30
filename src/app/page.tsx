import React from 'react';
import { WikiRenderer } from '@/components/wiki/WikiRenderer';
import { loadTextFile } from '@/lib/utils/wiki-utils';

const FrontPage = async () => {
    const content = loadTextFile('src/content/ageless-pages/frontpage.txt');

    return (
        <div className="text-black">
            <WikiRenderer content={content} />
        </div>
    );
};

export default FrontPage;
