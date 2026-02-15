import { FEATURES } from "../../../../constants/citizen_home";

const FeaturesSection = () => {
  return (
    <section className="relative max-w-7xl mx-auto px-4 py-20">
      {/* Header */}
      <div className="mb-24 max-w-2xl">
        <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-blue-600">
          <span className="h-px w-6 bg-blue-400/60" />
          What CivicEdge Enables
        </span>

        <h2 className="mt-4 text-3xl md:text-4xl font-extrabold leading-tight text-slate-800">
          Tools designed for{" "}
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            everyday civic action
          </span>
        </h2>

        <p className="mt-6 text-slate-500 leading-relaxed">
          Not complex systems or bureaucracy — just thoughtful ways for people
          to notice, care, and act together.
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 gap-x-16 gap-y-14">
        {FEATURES.map((item) => (
          <div
            key={item.title}
            className="
              group relative pl-8
              transition-all duration-300
            "
          >
            {/* Vertical accent line */}
            <div
              className="
                absolute left-0 top-0 h-full w-[2px]
                bg-gradient-to-b from-blue-500/40 to-transparent
                opacity-40 group-hover:opacity-80 transition
              "
            />

            {/* Content */}
            <h4 className="text-lg font-semibold text-slate-800 mb-3 tracking-wide">
              {item.title}
            </h4>

            <p className="text-slate-600 leading-relaxed max-w-md">
              {item.desc}
            </p>

            {/* Quiet interaction hint */}
            <div className="mt-4 text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition">
              Learn how →
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
