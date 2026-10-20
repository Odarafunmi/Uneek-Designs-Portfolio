import type { ReactNode } from "react";

/** Renders inline **bold** spans. */
function inline(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${keyPrefix}-${index}`}>{part.slice(2, -2)}</strong>;
    }
    return <span key={`${keyPrefix}-${index}`}>{part}</span>;
  });
}

/**
 * Minimal Markdown renderer for the post bodies: headings, bullet lists,
 * bold and paragraphs — all this content needs, with zero dependencies.
 */
export function renderMarkdown(source: string): ReactNode[] {
  const lines = source.split("\n");
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  let paragraph: string[] = [];

  const flushList = () => {
    if (!list.length) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`}>
        {list.map((item, index) => (
          <li key={index}>{inline(item, `li-${blocks.length}-${index}`)}</li>
        ))}
      </ul>,
    );
    list = [];
  };

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const text = paragraph.join(" ");
    blocks.push(<p key={`p-${blocks.length}`}>{inline(text, `p-${blocks.length}`)}</p>);
    paragraph = [];
  };

  lines.forEach((raw, index) => {
    const line = raw.trim();

    if (!line) {
      flushList();
      flushParagraph();
      return;
    }

    if (line.startsWith("## ")) {
      flushList();
      flushParagraph();
      blocks.push(<h2 key={`h-${index}`}>{line.replace(/^##\s+/, "")}</h2>);
      return;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      list.push(line.replace(/^-\s+/, ""));
      return;
    }

    flushList();
    paragraph.push(line);
  });

  flushList();
  flushParagraph();

  return blocks;
}
