// components/ui/Loader.tsx
"use client";
import Lottie from "lottie-react";
import loadingAnim from "../../../public/Loading.json";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="flex flex-col items-center">
        <Lottie
          animationData={loadingAnim}
          loop={true}
          className="w-48 h-48 drop-shadow-lg"
        />
        <h2 className="mt-4 text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
          Loading your experience...
        </h2>
      </div>
    </div>
  );
}
