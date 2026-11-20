import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function RootNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-text p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="font-mono font-bold text-7xl sm:text-8xl text-accent">
          404
        </div>
        <h1 className="font-bold text-2xl sm:text-3xl text-text">
          Page Not Found
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          The requested coordinate does not exist. Navigate back to the main homepage.
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
