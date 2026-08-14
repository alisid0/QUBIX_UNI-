import publishableSource from '../../../content-drafts/_all-publishable-bbs.md?raw';

// Reviewed lessons kept in the publishing manuscript are parsed only after a
// backend failure. Vite emits this module as a separate chunk, preserving fast
// first-load performance while making the curriculum dependable offline.
function floorHtml(source) {
  return source
    .trim()
    .split(/\n\s*\n/)
    .map((paragraph) => {
      const content = paragraph
        .replace(/\s*\n\s*/g, ' ')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      return /^<(?:p|ul|ol|blockquote|h[1-6])\b/i.test(content)
        ? content
        : `<p>${content}</p>`;
    })
    .join('');
}

function parsePublishableBoards(markdown) {
  const boards = {};
  const heading = /^## BB (\d+)\s+—\s+(.+)$/gm;
  const matches = [...markdown.matchAll(heading)];

  matches.forEach((match, index) => {
    const number = Number(match[1]);
    const title = match[2].trim();
    const end = matches[index + 1]?.index ?? markdown.length;
    const section = markdown.slice(match.index + match[0].length, end);
    const subject = section.match(/^\*\*Subject:\*\*\s*([^|\n]+)/m)?.[1]?.trim() || null;
    const floors = [];
    const floorPattern = /^\*\*Floor (\d+):\*\*\s*([\s\S]*?)(?=\n\s*\n\*\*Floor \d+:\*\*|\n\s*\n---|$)/gm;

    for (const floor of section.matchAll(floorPattern)) {
      const text = floor[2].trim();
      if (text) floors.push({ text: floorHtml(text), img: null, audio: null });
    }

    // Single-floor anecdotes remain useful supporting cards, but only complete
    // multi-floor lessons are used to replace unavailable production content.
    if (floors.length >= 3) {
      boards[number] = {
        act: 'I',
        kicker: `BB ${number}`,
        title,
        layers: floors,
        img: null,
        tags: {
          ...(subject ? { subject } : {}),
          kind: 'bb',
          source: 'publishable-review',
          reviewStatus: 'final'
        }
      };
    }
  });

  return boards;
}

export const PUBLISHABLE_LEGACY_BOARDS = parsePublishableBoards(publishableSource);
