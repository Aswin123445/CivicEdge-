const EvidenceThumb = ({ url, onClick }) => (
  <div onClick={onClick} className="group relative aspect-square bg-[#1e1e1e] rounded-xl overflow-hidden cursor-pointer border border-slate-700">
    <img src={url} alt="Evidence" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
      <span className="text-white text-xs font-bold bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">View</span>
    </div>
  </div>
);

export default EvidenceThumb;