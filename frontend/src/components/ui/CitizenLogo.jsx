import React from "react";

const CitizenLogo = () => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-blue-600 font-bold">
        C
      </div>
      <span className="text-xl font-bold">CivicEdge</span>
    </div>
  );
};

export default CitizenLogo;
