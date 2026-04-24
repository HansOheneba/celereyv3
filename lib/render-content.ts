import { marked, Renderer, type Tokens } from "marked";

/**
 * Strips em dashes and replaces them with grammatically correct alternatives.
 * Also normalises non-breaking hyphens and narrow spaces.
 */
function sanitiseContent(raw: string): string {
  return (
    raw
      // " — " (spaced em dash) → ", " (comma+space is almost always correct)
      .replace(/\s*\u2014\s*/g, ", ")
      // non-breaking hyphen (‑) → regular hyphen
      .replace(/\u2011/g, "-")
      // narrow no-break space → regular space
      .replace(/\u202f/g, " ")
  );
}

/**
 * Custom marked renderer: links open in new tab, headings get scroll-margin IDs.
 */
function buildRenderer(): Renderer {
  const renderer = new Renderer();

  // Links → new tab
  renderer.link = ({ href, title, tokens }: Tokens.Link) => {
    const text = renderer.parser
      ? renderer.parser.parseInline(tokens)
      : tokens.map((t) => t.raw).join("");
    const titleAttr = title ? ` title="${title}"` : "";
    return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`;
  };

  // Headings → inject id for scroll-spy
  renderer.heading = ({ text, depth }: Tokens.Heading) => {
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    const isCtaHeading =
      text.toLowerCase().includes("working with") ||
      text.toLowerCase().includes("celerey");

    const cls = isCtaHeading ? ' class="cta-heading"' : "";
    return `<h${depth} id="${id}" style="scroll-margin-top:120px"${cls}>${text}</h${depth}>\n`;
  };

  return renderer;
}

/**
 * Wraps the "Working With Celerey" section in a styled CTA box.
 * Detects the heading and wraps everything until the next h2/h3 or end of content.
 */
function wrapCtaSection(html: string): string {
  // Match from the cta-heading h3 to end of content (it's always the last section)
  return html.replace(
    /(<h3[^>]*class="cta-heading"[^>]*>[\s\S]*?<\/h3>)([\s\S]*)$/,
    `<div class="cta-section">$1$2</div>`,
  );
}

export async function renderContent(raw: string): Promise<string> {
  const sanitised = sanitiseContent(raw);

  marked.use({
    renderer: buildRenderer(),
    breaks: false, // let paragraphs be proper paragraphs
    gfm: true,
  });

  const html = await marked(sanitised);
  return wrapCtaSection(html);
}
