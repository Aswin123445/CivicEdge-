const SectionTitle = ({ title }) => (
  <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
    <span className="w-1 h-5 bg-blue-600 rounded-full"></span>
    {title}
  </h2>
);

export default SectionTitle;