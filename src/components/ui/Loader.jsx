import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-white"></div>
    </div>
  );
};

export default Loader;
