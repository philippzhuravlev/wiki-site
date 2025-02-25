import { notFound } from 'next/navigation';
import { loadTextFile } from '@/lib/utils/file-utils';
import { renderWikiContent } from '@/lib/utils/render-utils';
import { getEquivalentRegion } from '@/lib/utils/era-utils';
import { promises as fs } from 'fs'; // i.e. File System 
import * as pathLib from 'path'; // i.e. Path

// NB: We have three renderWikiContent(content) functions to render
// 1. frontpage.txt
// 2. region.txt
// 3. subpage.txt
// there's probably a way to refactor this, but it works for now

// interface for the page properties
interface PageProperties {
  params: Promise<{ path: string[] }>; // (promised) path is an array of strings
}

// create ERAS as a constant array (i.e. tuple) of strings
const ERAS = ['golden', 'steel', 'coal'] as const; // Read-only; could be array/enum of eras
type Era = typeof ERAS[number]; // or type Era = 'golden' | 'steel' | 'coal';

// export (so it can be imported) the page component as default
export default async function ContentPage({ params: pathparam }: PageProperties) {
  const { path } = await pathparam;
  
  // handle era routes
  if (ERAS.includes(path[0] as Era)) { // i.e. if path[0] is one of the eras
    const currentEra = path[0] as Era;

    if (path.length === 1) { // i.e. if it's the frontpage of /golden, /steel, /coal
      try {
        const content = await loadTextFile(`src/content/${currentEra}/frontpage.txt`);
        return ( // hence why we use .tsx and not .ts; it's a React (XML/JSX/HMTL-like) component
          <div className="text-black">
            {await renderWikiContent(content)} 
          </div> // i.e. renders the frontpage.txt content
        );
      } catch (error) {
        console.error('Error loading era frontpage:', error);
        notFound();
      }
    } else {    // i.e. if it's a subpage like /golden/valloraich, /steel/albrion, /coal/angbrea
      const currentRegion = path[1]; // get "slug" part of the path

      try { // to load metadata.json

        // gets metadata path to ultimately read metadata.json
        // NB: process.cwd() is the current working directory
        // NB: pathLib.join() is a function that joins the current working directory with the path to the metadata.json file
        const metadataPath = pathLib.join(process.cwd(), 'src', 'content', currentEra, 'metadata.json');
        // meanwhile fs.readFile() is a function that reads the metadata.json file
        const metadataContent = await fs.readFile(metadataPath, 'utf8');
        const { regions } = JSON.parse(metadataContent);
        // or const regions = JSON.parse(metadataContent).regions;

        // i.e. "check if the region exists in the metadata.json file"
        // some() checks if ANY in the array matches the condition
        // => if it does, regionExists is true
        const regionExists = regions.some((r: { id: string }) => r.id === currentRegion);
        if (!regionExists) {
          notFound();
        }

        // i.e. "load the content of the region"
        const content = await loadTextFile(`src/content/${currentEra}/${currentRegion}.txt`);
        return (
          <div className="text-black">
            {await renderWikiContent(content)}
          </div> // i.e. renders the region.txt content
        );
      } catch (error) {
        console.error('Error loading era page:', error);
        notFound();
      }
    }
  }

  // Handle non-era routes like /about
  const pagePath = path.join(''); // Join the path array with empty separator
  try {
    const content = await loadTextFile(`src/content/${pagePath}.txt`);
    return (
      <div className="text-black">
        {await renderWikiContent(content)}
      </div> // i.e. renders the subpage.txt content
    );
  } catch (error) {
    console.error('Error loading:', pagePath, error);
    notFound();
  }
} 