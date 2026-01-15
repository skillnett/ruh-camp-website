import React from "react";

export function scrollToSection(sectionId: string, headerOffset: number = 100) {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const header = document.querySelector("header");
  const nav = header?.querySelector("nav");
  const headerHeight = nav
    ? nav.getBoundingClientRect().height
    : header
      ? header.getBoundingClientRect().height
      : headerOffset;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

  window.scrollTo({
    top: Math.max(0, offsetPosition),
    behavior: "smooth",
  });
}

export function extractTextFromLexical(content: unknown): string {
  if (!content || typeof content !== "object") {
    return typeof content === "string" ? content : "";
  }

  if (
    "root" in content &&
    typeof content.root === "object" &&
    content.root !== null
  ) {
    const root = content.root as {
      children?: Array<{
        children?: unknown[];
        text?: string;
        [key: string]: unknown;
      }>;
      [key: string]: unknown;
    };

    const extractText = (node: unknown): string => {
      if (typeof node === "string") {
        return node;
      }
      if (typeof node === "object" && node !== null) {
        const obj = node as {
          text?: string;
          children?: unknown[];
          [key: string]: unknown;
        };
        let text = obj.text || "";
        if (obj.children && Array.isArray(obj.children)) {
          text += obj.children.map(extractText).join("");
        }
        return text;
      }
      return "";
    };

    if (root.children && Array.isArray(root.children)) {
      return root.children.map(extractText).join(" ");
    }
  }

  return "";
}

/**
 * Apply highlights to text by wrapping specified words/phrases with <b> tags
 * @param text - The text to process
 * @param highlights - Comma-separated list of words/phrases to highlight
 * @returns Text with highlighted words/phrases wrapped in <b> tags
 */
export function applyHighlights(text: string, highlights: string): string {
  if (!highlights || !text) return text;

  const highlightList = highlights
    .split(",")
    .map((h) => h.trim())
    .filter((h) => h.length > 0);

  if (highlightList.length === 0) return text;

  let result = text;

  const sortedHighlights = highlightList.sort((a, b) => b.length - a.length);

  sortedHighlights.forEach((highlight) => {
    const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escapedHighlight, "gi");
    result = result.replace(regex, (match) => `<b>${match}</b>`);
  });

  return result;
}

/**
 * Parse HTML string with <b> tags and return React elements
 * @param html - HTML string containing <b> tags
 * @returns Array of React elements with highlighted text wrapped in <b> tags
 */
export function parseHighlightedText(html: string) {
  const parts = html.split(/(<b>.*?<\/b>)/g);
  return parts.map((part, index) => {
    if (part.startsWith("<b>") && part.endsWith("</b>")) {
      const text = part.replace(/<\/?b>/g, "");
      return React.createElement("b", { key: index }, text);
    }
    return React.createElement(React.Fragment, { key: index }, part);
  });
}
