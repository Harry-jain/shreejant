import React from "react";

interface GoldDividerProps {
  className?: string;
  withDiamond?: boolean;
}

export function GoldDivider({ className = "", withDiamond = false }: GoldDividerProps) {
  if (withDiamond) {
    return (
      <div className={`relative flex items-center justify-center w-full py-4 ${className}`}>
        <div className="flex-grow h-[1px] bg-black/5 dark:bg-white/5" />
        <div className="mx-4 flex items-center justify-center">
          <div className="w-2 h-2 rotate-45 border border-[#7C5CFC]/40 bg-white dark:bg-[#090C15]" />
        </div>
        <div className="flex-grow h-[1px] bg-black/5 dark:bg-white/5" />
      </div>
    );
  }

  return (
    <div
      className={`w-full h-[1px] bg-black/5 dark:bg-white/5 my-0 transition-opacity ${className}`}
      role="separator"
    />
  );
}

