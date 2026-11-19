import React from "react";
import { Badge } from "./Badge";

interface SectionLabelProps {
  label: string;
  className?: string;
  centered?: boolean;
}

export function SectionLabel({ label, className = "", centered = false }: SectionLabelProps) {
  return (
    <div className={`flex items-center ${centered ? "justify-center" : "justify-start"} mb-4 ${className}`}>
      <Badge size="sm">{label}</Badge>
    </div>
  );
}
