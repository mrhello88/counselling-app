// LoadingOverlay.jsx
import React from 'react';
import { LoaderCircle } from 'lucide-react';

export const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <LoaderCircle className="w-16 h-16 animate-spin text-white" />
    </div>
  );
};