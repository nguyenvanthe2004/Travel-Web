import React from "react";
import { Loader } from "lucide-react";

interface LoadingPageProps {
  height?: string; 
  size?: number;   
}

const LoadingPage: React.FC<LoadingPageProps> = ({
  height = "60vh",
  size = 40,
}) => {
  return (
    <div
      className="flex items-center justify-center w-full"
      style={{ height }}
    >
      <Loader
        size={size}
        className="animate-spin text-gray-500"
      />
    </div>
  );
};

export default LoadingPage;
