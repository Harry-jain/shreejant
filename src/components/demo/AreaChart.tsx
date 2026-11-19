'use client';

import React from 'react';

export interface AreaChartProps {
  data?: number[];
  className?: string;
  label?: string;
}

export function AreaChart({
  data = [12, 18, 15, 22, 30, 26, 34, 41],
  className = 'w-full h-24',
  label = 'Dispatch value upward trend over the last 8 days from 12 to 41 Lakhs',
}: AreaChartProps) {
  const width = 360;
  const height = 80;
  const paddingY = 10;

  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);
  const range = maxVal - minVal || 1;

  const stepX = width / (data.length - 1);

  const points = data.map((val, idx) => {
    const x = Math.round(idx * stepX);
    const y = Math.round(
      height - paddingY - ((val - minVal) / range) * (height - 2 * paddingY)
    );
    return [x, y] as [number, number];
  });

  const polylineStr = points.map(([x, y]) => `${x},${y}`).join(' ');
  const areaPolygonStr = `${polylineStr} ${width},${height} 0,${height}`;
  const lastPoint = points[points.length - 1];

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="w-full h-full overflow-visible"
        role="img"
        aria-label={label}
      >
        <defs>
          <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6D28D9" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Faint Horizontal Gridlines */}
        <line
          x1="0"
          y1={height * 0.35}
          x2={width}
          y2={height * 0.35}
          stroke="#E4DDFB"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <line
          x1="0"
          y1={height * 0.7}
          x2={width}
          y2={height * 0.7}
          stroke="#E4DDFB"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Soft Gradient Fill Area */}
        <polygon points={areaPolygonStr} fill="url(#area-grad)" />

        {/* 2px Purple Stroke Polyline */}
        <polyline
          fill="none"
          stroke="#6D28D9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={polylineStr}
        />

        {/* Dot on the last point */}
        <circle
          cx={lastPoint[0]}
          cy={lastPoint[1]}
          r="4"
          fill="#6D28D9"
          stroke="#FFFFFF"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
