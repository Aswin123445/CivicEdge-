import React from 'react'

const ImageModelPreview = ({ imageUrl, onClose }) => {
  return (
    <div 
          className="fixed inset-0 z-50 bg-slate-950/90 flex items-center justify-center p-4 backdrop-blur-sm transition-all"
          onClick={() => onClose(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button className="absolute -top-12 right-0 text-white hover:text-blue-400 transition text-sm font-bold flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              Close Preview
            </button>
            <img 
              src={imageUrl.cloudinary_url} 
              alt="Evidence Large" 
              className="w-full h-auto rounded-xl shadow-2xl border border-slate-800"
            />
          </div>
        </div>
  )
}

export default ImageModelPreview
