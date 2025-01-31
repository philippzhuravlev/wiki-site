import { loadTextFile } from '@/lib/utils/file-utils';
import { renderWikiContent } from '@/lib/utils/render-utils';

export default async function FrontPage() {
    const content = loadTextFile('src/content/frontpage.txt');

    return (
        <div className="text-black">
            {await renderWikiContent(content)}
        </div>
    );
}
