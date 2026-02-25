import React from 'react';

const Step = ({ icon, title, text }) => {
  return (
    <div className="relative text-center px-4">
      
      {/* Step indicator */}
      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center 
                      font-bold text-lg mx-auto mb-6 
                      shadow-lg shadow-blue-600/20">
        {icon}
      </div>

      {/* Step title */}
      <h3 className="text-lg font-bold text-white mb-2">
        {title}
      </h3>

      {/* Step description */}
      <p className="text-sm text-blue-100 leading-relaxed">
        {text}
      </p>
    </div>
  );
};

export default Step;