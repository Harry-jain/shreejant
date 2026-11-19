import React from 'react';

export interface DemoLinkProps {
  href?: string;
  className?: string;
  children: React.ReactNode;
  isEmbed?: boolean;
}

// In demo sites, links are strictly in-page anchors (e.g. #services)
// or point to #demo-note toast. Never external / real submission.
export function DemoLink({
  href = '#demo-note',
  className = '',
  children,
  isEmbed = false,
}: DemoLinkProps) {
  const targetHref = href.startsWith('#') ? href : '#demo-note';

  return (
    <a
      href={targetHref}
      className={className}
      target={isEmbed && !targetHref.startsWith('#') ? '_top' : undefined}
    >
      {children}
    </a>
  );
}

export default DemoLink;
