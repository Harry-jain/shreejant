import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SiteNotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center relative px-4 text-center">
      <div className="relative z-10 max-w-md space-y-6">
        <div className="font-mono font-bold text-7xl sm:text-8xl text-accent">
          404
        </div>
        <h1 className="font-bold text-2xl sm:text-3xl text-text">
          Page Not Found
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          The page you are looking for does not exist. Navigate back to the homepage.
        </p>
        <div className="pt-2">
          <Button href="/" variant="primary" size="default" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Return to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
