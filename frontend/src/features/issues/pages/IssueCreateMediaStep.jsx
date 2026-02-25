import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  X, 
  Image as ImageIcon, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- Animation Variants ---
const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.35, ease: "easeOut" } 
  }
};

const IssueCreateMediaStep = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 3) {
      // Logic for max 3 images
      const allowed = files.slice(0, 3 - images.length);
      setImages([...images, ...allowed.map(file => URL.createObjectURL(file))]);
    } else {
      setImages([...images, ...files.map(file => URL.createObjectURL(file))]);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const canContinue = images.length >= 2;

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans antialiased text-slate-900">
      <motion.main 
        className="max-w-2xl mx-auto px-6 pt-12"
        initial="hidden"
        animate="visible"
        variants={CONTAINER_VARIANTS}
      >
        {/* 🟦 Section 1: Page Header */}
        <motion.header variants={ITEM_VARIANTS} className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Add Evidence</h1>
          <p className="text-slate-500 mt-3 text-lg">
            Upload clear photos of the issue. This helps authorities understand and resolve it faster.
          </p>
          <p className="text-xs text-slate-400 mt-2 font-medium">
            You need at least 2 photos. You can upload up to 3.
          </p>
        </motion.header>

        {/* 🟦 Section 2: Progress Indicator */}
        <motion.section variants={ITEM_VARIANTS} className="mb-12">
          <div className="
            rounded-3xl p-6
            bg-gradient-to-br from-blue-50 via-blue-100/60 to-white
            border border-blue-200/60
            shadow-lg shadow-blue-900/5
          ">
            <div className="grid grid-cols-5 gap-3">
              {[
                { name: 'Issue Details', active: false },
                { name: 'Mark Location', active: false },
                { name: 'Add Photos', active: true },
                { name: 'A Few Questions', active: false },
                { name: 'Review Issue', active: false },
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  
                  {/* Progress bar */}
                  <div
                    className={`h-1.5 w-full rounded-full transition-colors ${
                      step.active
                        ? 'bg-blue-600'
                        : 'bg-blue-200'
                    }`}
                  />
        
                  {/* Step label */}
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider text-center ${
                      step.active
                        ? 'text-blue-700'
                        : 'text-blue-400'
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 🟦 Section 3: Upload Area */}
        <motion.section variants={ITEM_VARIANTS} className="mb-8">
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileChange}
            disabled={images.length >= 3}
          />
          <button 
            onClick={() => fileInputRef.current.click()}
            className={`w-full group aspect-video sm:aspect-[21/9] rounded-[2rem] border-2 border-dashed transition-all flex flex-col items-center justify-center gap-3
              ${images.length >= 3 
                ? 'bg-slate-100 border-slate-200 cursor-not-allowed' 
                : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 shadow-sm hover:shadow-md'
              }`}
          >
            <div className={`p-4 rounded-2xl transition-colors ${images.length >= 3 ? 'bg-slate-200 text-slate-400' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'}`}>
              <Camera size={32} />
            </div>
            <div className="text-center">
              <p className="font-bold text-slate-700">
                {images.length >= 3 ? "Maximum photos added" : "Click to upload photos"}
              </p>
              <p className="text-xs text-slate-400 mt-1">JPEG or PNG • Clear images work best</p>
            </div>
          </button>
        </motion.section>

        {/* 🟦 Section 4: Image Preview Grid */}
        <motion.section variants={ITEM_VARIANTS} className="grid grid-cols-3 gap-4 mb-8">
          {[0, 1, 2].map((index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="relative aspect-square rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm group">
                {images[index] ? (
                  <>
                    <img src={images[index]} alt={`Evidence ${index + 1}`} className="w-full h-full object-cover" />
                    <button 
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur rounded-lg shadow-sm text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/50 backdrop-blur rounded text-[10px] font-bold text-white">
                      Photo {index + 1}
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-1">
                    <ImageIcon size={24} />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Slot {index + 1}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </motion.section>

        {/* 🟦 Section 5: Validation & Guidance */}
        <motion.div variants={ITEM_VARIANTS} className="mb-10 px-1">
          {images.length < 2 ? (
            <div className="flex items-center gap-2 text-slate-500">
              <AlertCircle size={16} />
              <p className="text-sm font-medium">Please add at least 2 photos to continue.</p>
            </div>
          ) : images.length === 3 ? (
            <div className="flex items-center gap-2 text-blue-600">
              <CheckCircle2 size={16} />
              <p className="text-sm font-medium">You’ve added the maximum number of photos.</p>
            </div>
          ) : (
            <p className="text-sm text-slate-500">You can add one more photo for extra clarity.</p>
          )}
        </motion.div>

        {/* 🟦 Section 6: Reassurance Block */}
        <motion.div 
          variants={ITEM_VARIANTS}
          className="p-6 bg-white rounded-3xl flex items-start gap-4 border border-slate-200 shadow-sm"
        >
          <div className="bg-blue-50 p-2 rounded-xl text-blue-600 shrink-0">
            <CheckCircle2 size={20} />
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Photos are saved automatically to your draft. You can change or remove them anytime before final submission.
          </p>
        </motion.div>

        {/* 🟦 Section 7: Primary Actions */}
        <motion.footer 
          variants={ITEM_VARIANTS} 
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-200"
        >
          <button className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold text-sm transition-colors group">
            <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Details
          </button>
          
          <button 
            onClick={() => {navigate('/issue/1/behavioral-prompts')}}
            disabled={!canContinue}
            className={`w-full sm:w-auto px-12 py-4 font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 group
              ${canContinue 
                ? 'bg-blue-900 text-white shadow-blue-900/20 hover:bg-blue-800 active:scale-[0.98]' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
          >
            Continue
            <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.footer>
      </motion.main>
    </div>
  );
};

export default IssueCreateMediaStep;