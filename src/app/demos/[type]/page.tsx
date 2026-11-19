import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DEMO_IDS, getDemoConfig } from '@/demos/demos.config';
import { getDemoFontClass } from '@/demos/fonts';
import { DemoShell } from '@/demos/DemoShell';
import { JewelleryHomeDemo } from '@/components/demo/JewelleryHomeDemo';
import {
  DemoHero,
  DemoServices,
  DemoMenuTabs,
  DemoProducts,
  DemoSchedule,
  DemoPlans,
  DemoBooking,
  DemoHours,
  DemoFaq,
  DemoGallery,
  DemoFooter,
} from '@/demos/sections';

export function generateStaticParams() {
  return DEMO_IDS.map((id) => ({
    type: id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const config = getDemoConfig(type);

  if (!config) {
    return {
      title: 'Demo Not Found',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `Sample demo — ${config.name}`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function DemoPage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { type } = await params;
  const sp = searchParams ? await searchParams : {};
  const isEmbed = sp?.embed === '1';

  const config = getDemoConfig(type);
  if (!config) {
    notFound();
  }

  const fontClass = getDemoFontClass(config.id);

  return (
    <div className={`min-h-screen ${fontClass}`}>
      <DemoShell config={config} initialEmbed={isEmbed}>
        {config.id === 'jewellery' ? (
          <JewelleryHomeDemo bare brandName={config.name} />
        ) : (
          <>
            <DemoHero config={config} />

            {config.id === 'salon' && (
              <>
                <DemoServices config={config} />
                <DemoBooking config={config} />
                <DemoGallery config={config} />
                <DemoHours config={config} />
              </>
            )}

            {config.id === 'clinic' && (
              <>
                <DemoServices config={config} />
                <DemoBooking config={config} />
                <DemoFaq config={config} />
                <DemoHours config={config} />
              </>
            )}

            {config.id === 'restaurant' && (
              <>
                <DemoMenuTabs config={config} />
                <DemoBooking config={config} />
                <DemoHours config={config} />
              </>
            )}

            {config.id === 'gym' && (
              <>
                <DemoPlans config={config} />
                <DemoSchedule config={config} />
                <DemoBooking config={config} />
                <DemoHours config={config} />
              </>
            )}

            {config.id === 'shop' && (
              <>
                <DemoProducts config={config} />
                <DemoHours config={config} />
              </>
            )}

            {config.id === 'classes' && (
              <>
                <DemoSchedule config={config} />
                <DemoBooking config={config} />
                <DemoFaq config={config} />
                <DemoHours config={config} />
              </>
            )}

            {config.id === 'general' && (
              <>
                <DemoServices config={config} />
                <DemoBooking config={config} />
                <DemoFaq config={config} />
                <DemoHours config={config} />
              </>
            )}

            <DemoFooter config={config} />
          </>
        )}
      </DemoShell>
    </div>
  );
}