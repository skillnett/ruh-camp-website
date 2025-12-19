export function scrollToSection(sectionId: string, headerOffset: number = 100) {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}

/**
 * Extract plain text from Lexical rich text content
 */
export function extractTextFromLexical(content: unknown): string {
  if (!content || typeof content !== "object") {
    return typeof content === "string" ? content : "";
  }

  // Check if it's a Lexical rich text object
  if ("root" in content && typeof content.root === "object" && content.root !== null) {
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
        const obj = node as { text?: string; children?: unknown[]; [key: string]: unknown };
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

