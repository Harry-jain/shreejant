import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BrandWatermark } from "@/components/ui/BrandWatermark";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center relative px-4 text-center overflow-hidden">
      <BrandWatermark text="404" position="center" className="opacity-10" />
      <div className="relative z-10 max-w-md space-y-6">
        <div className="font-mono font-bold text-7xl sm:text-8xl text-[#7C5CFC]">
          404
        </div>
        <h1
          className="font-heading font-bold text-2xl sm:text-3xl text-brand-text"
          style={{ textTransform: "none" }}
        >
          Page Not Found
        </h1>
        <p className="font-body text-[15px] text-brand-muted leading-relaxed">
          The requested coordinate does not exist in our digital architecture. Navigate back to the main portal.
        </p>
        <div className="pt-2">
          <Button href="/" variant="primary" size="default" leftIcon={<ArrowLeft className="w-4 h-4 mr-1" />}>
            Return to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
