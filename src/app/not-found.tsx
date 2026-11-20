import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RootNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#090C15] text-white p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="font-mono font-bold text-7xl sm:text-8xl text-blue-500">
          404
        </div>
        <h1 className="font-bold text-2xl sm:text-3xl">
          Page Not Found
        </h1>
        <p className="text-sm text-gray-300 leading-relaxed">
          The requested coordinate does not exist in our digital architecture. Navigate back to the main portal.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
