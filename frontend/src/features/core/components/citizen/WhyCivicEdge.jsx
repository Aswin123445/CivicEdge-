import { REASONS } from "../../../../constants/citizen_home";
import { HomeIcons as Icons } from "../../ui/HomeIcons";

const WhyCivicEdge = () => {
  return (
    <section className="relative bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="max-w-2xl mb-20">


          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">
            Why CivicEdge{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Matters
            </span>
          </h2>

          <p className="mt-5 text-slate-500 leading-relaxed">
            CivicEdge exists to help citizens take part in shaping cleaner,
            safer, and more responsible cities — together.
          </p>
        </div>

        {/* Reasons */}
        <div className="space-y-10">
          {REASONS.map((item) => (
            <div
              key={item.title}
              className="
                group flex gap-6 rounded-2xl p-6 md:p-8
                bg-white/80 backdrop-blur
                border border-slate-200
                transition-all duration-300
                hover:shadow-xl hover:-translate-y-1
              "
            >
              {/* Icon */}
              <div
                className="
                  flex-shrink-0 w-14 h-14 rounded-xl
                  bg-blue-100 text-blue-600
                  flex items-center justify-center
                  transition-all duration-300
                  group-hover:bg-blue-600 group-hover:text-white
                "
              >
                <Icons.Shield />
              </div>

              {/* Text */}
              <div>
                <h4 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h4>
                <p className="text-slate-600 leading-relaxed max-w-3xl">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyCivicEdge;
