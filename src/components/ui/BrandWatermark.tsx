import React from "react";

interface BrandWatermarkProps {
  text?: string;
  className?: string;
  position?: "center" | "top" | "bottom";
}

export function BrandWatermark({
  text = "SHREEJAN",
  className = "",
  position = "center",
}: BrandWatermarkProps) {
  const positionClasses = {
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    top: "top-8 left-1/2 -translate-x-1/2",
    bottom: "bottom-8 left-1/2 -translate-x-1/2",
  };

  return (
    <div
      aria-hidden="true"
      className={`absolute pointer-events-none select-none z-0 overflow-hidden leading-none font-heading font-black tracking-widest text-[22vw] sm:text-[18vw] md:text-[16vw] lg:text-[14vw] whitespace-nowrap ${positionClasses[position]} ${className}`}
      style={{
        color: "var(--color-watermark)",
        opacity: "var(--watermark-opacity)",
      }}
    >
      {text}
    </div>
  );
}

