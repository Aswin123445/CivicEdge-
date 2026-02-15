const HomeFooter = () => {
  return (
    <div className="bg-gradient-to-b from-blue-300 to-blue-700 py-24 text-center text-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 leading-tight">
          Real change begins when individuals choose to care, participate, and
          act together for their community.
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          <button className="px-12 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-xl hover:scale-105 transition-transform">
            Get Started
          </button>
          <button className="px-12 py-4 border-2 border-white/40 font-bold rounded-xl hover:bg-white/10 transition-colors">
            Know More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;
