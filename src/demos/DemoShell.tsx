import React from 'react';
import { DemoConfig } from './demos.config';
import { TheatreView } from './TheatreView';

export interface DemoShellProps {
  config: DemoConfig;
  initialEmbed?: boolean;
  children: React.ReactNode;
}

export function DemoShell({
  config,
  initialEmbed = false,
  children,
}: DemoShellProps) {
  return (
    <TheatreView config={config} initialEmbed={initialEmbed}>
      {children}
    </TheatreView>
  );
}

export default DemoShell;