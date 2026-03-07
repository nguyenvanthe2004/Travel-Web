import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div
      style={{ fontFamily: "sans-serif" }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4"
    >
      <div className="text-6xl mb-4">🔍</div>
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        No Data Found
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        We couldn't find any results to display.
      </p>
    </div>
  );
};

export default NotFoundPage;
