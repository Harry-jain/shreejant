"use client";

import React from "react";
import { GoldDivider } from "@/components/ui/GoldDivider";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Split into structural blocks by double newlines or table/quote/divider boundaries
  const lines = content.split(/\r?\n/);
  const elements: React.ReactNode[] = [];
  let i = 0;

  // Helper to format inline markdown (bold, italic, code)
  const formatInline = (text: string): React.ReactNode => {
    // Regex for bold, italic, code
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      // Bold: **text**
      const boldMatch = remaining.match(/^([\s\S]*?)\*\*(.+?)\*\*([\s\S]*)$/);
      // Italic: *text*
      const italicMatch = remaining.match(/^([\s\S]*?)\*([^*]+?)\*([\s\S]*)$/);

      // Find earliest match
      const boldIdx = remaining.indexOf("**");
      const italicIdx = remaining.search(/(?<!\*)\*(?!\*)/);

      if (boldIdx !== -1 && (italicIdx === -1 || boldIdx <= italicIdx)) {
        const pre = remaining.slice(0, boldIdx);
        const end = remaining.indexOf("**", boldIdx + 2);
        if (end !== -1) {
          if (pre) parts.push(<span key={key++}>{pre}</span>);
          const boldText = remaining.slice(boldIdx + 2, end);
          parts.push(
            <strong key={key++} className="font-semibold text-brand-text">
              {formatInline(boldText)}
            </strong>
          );
          remaining = remaining.slice(end + 2);
          continue;
        }
      } else if (italicIdx !== -1) {
        const pre = remaining.slice(0, italicIdx);
        const end = remaining.slice(italicIdx + 1).search(/(?<!\*)\*(?!\*)/);
        if (end !== -1) {
          const actualEnd = italicIdx + 1 + end;
          if (pre) parts.push(<span key={key++}>{pre}</span>);
          const italicText = remaining.slice(italicIdx + 1, actualEnd);
          parts.push(
            <em key={key++} className="italic text-brand-text">
              {formatInline(italicText)}
            </em>
          );
          remaining = remaining.slice(actualEnd + 1);
          continue;
        }
      }

      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }

    return parts.length === 1 ? parts[0] : <>{parts}</>;
  };

  while (i < lines.length) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // 1. Empty lines
    if (!line) {
      i++;
      continue;
    }

    // 2. Horizontal divider: --- or ***
    if (line === "---" || line === "***") {
      elements.push(<GoldDivider key={`divider-${i}`} className="my-8" />);
      i++;
      continue;
    }

    // 3. Headings: ### or #### or ##
    if (line.startsWith("#### ")) {
      elements.push(
        <h4
          key={`h4-${i}`}
          className="font-heading font-semibold text-lg sm:text-[19px] text-brand-text mt-8 mb-3"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          {formatInline(line.replace(/^####\s+/, ""))}
        </h4>
      );
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={`h3-${i}`}
          className="font-heading font-bold text-xl sm:text-2xl text-brand-text mt-10 mb-4 tracking-[-0.5px]"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          {formatInline(line.replace(/^###\s+/, ""))}
        </h3>
      );
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={`h2-${i}`}
          className="font-heading font-bold text-2xl sm:text-3xl text-brand-text mt-12 mb-4 tracking-[-0.8px]"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          {formatInline(line.replace(/^##\s+/, ""))}
        </h2>
      );
      i++;
      continue;
    }

    // 4. Tables: starts with |
    if (line.startsWith("|") && line.endsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|") && lines[i].trim().endsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const headerRow = tableLines[0]
          .split("|")
          .slice(1, -1)
          .map((c) => c.trim());
        // line 1 is separator | :--- | :--- |
        const bodyRows = tableLines.slice(2).map((row) =>
          row
            .split("|")
            .slice(1, -1)
            .map((c) => c.trim())
        );

        elements.push(
          <div key={`table-${i}`} className="overflow-x-auto my-8 -mx-2 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full border-collapse border border-brand-border/80 rounded-xl overflow-hidden bg-brand-surface shadow-sm">
                <thead>
                  <tr className="bg-brand-bg-alt/70 border-b border-brand-border">
                    {headerRow.map((cell, cIdx) => (
                      <th
                        key={cIdx}
                        className="px-4 py-3 text-left font-heading font-semibold text-xs sm:text-sm text-brand-text uppercase tracking-wider"
                      >
                        {formatInline(cell)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/60">
                  {bodyRows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className={rIdx % 2 === 0 ? "bg-brand-surface" : "bg-brand-bg-alt/25"}
                    >
                      {row.map((cell, cIdx) => {
                        const isImpact = cIdx === row.length - 1;
                        return (
                          <td
                            key={cIdx}
                            className={`px-4 py-3.5 text-xs sm:text-sm font-body ${
                              isImpact
                                ? "text-[#7C5CFC] font-semibold"
                                : "text-brand-text"
                            }`}
                          >
                            {formatInline(cell)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
        continue;
      }
    }

    // 5. Blockquotes: starts with >
    if (line.startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && (lines[i].trim().startsWith(">") || lines[i].trim() === "")) {
        if (lines[i].trim().startsWith(">")) {
          quoteLines.push(lines[i].trim().replace(/^>\s*/, ""));
        }
        i++;
      }

      elements.push(
        <blockquote
          key={`quote-${i}`}
          className="border-l-4 border-[#7C5CFC] bg-black/5 dark:bg-white/5 rounded-r-2xl p-6 sm:p-7 my-8 space-y-3 italic text-ink/90 dark:text-white/90 font-body shadow-xs"
        >
          {quoteLines.map((qLine, qIdx) => (
            <p key={qIdx} className="leading-relaxed text-[15px] sm:text-[16px]">
              {formatInline(qLine)}
            </p>
          ))}
        </blockquote>
      );
      continue;
    }

    // 6. Ordered list: 1. 2. 3.
    if (/^\d+\.\s+/.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }

      elements.push(
        <ol key={`ol-${i}`} className="space-y-3 my-6 pl-2">
          {listItems.map((item, lIdx) => (
            <li key={lIdx} className="flex items-start gap-3 text-brand-text font-body text-[15px] leading-relaxed">
              <span className="font-mono font-bold text-[#7C5CFC] text-sm mt-0.5 shrink-0">
                {String(lIdx + 1).padStart(2, "0")}.
              </span>
              <span>{formatInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // 7. Unordered list: - or *
    if (/^[-*]\s+/.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i++;
      }

      elements.push(
        <ul key={`ul-${i}`} className="space-y-2.5 my-6 pl-2">
          {listItems.map((item, lIdx) => (
            <li key={lIdx} className="flex items-start gap-3 text-brand-text font-body text-[15px] leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C5CFC] mt-2 shrink-0" />
              <span>{formatInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // 8. Regular paragraph
    elements.push(
      <p
        key={`p-${i}`}
        className="font-body text-brand-text/90 text-[15px] sm:text-[16px] leading-[1.8] mb-4"
        style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
      >
        {formatInline(line)}
      </p>
    );
    i++;
  }

  return <div className="space-y-2">{elements}</div>;
}
