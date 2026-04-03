// components/volunteer/HeroSection.jsx
import { Search } from "lucide-react";
import armyhome from "../../../../assets/army2.webp";

/**
 * @param {function} onExplore      - () => void
 * @param {function} onViewActivity - () => void
 */
const HeroSection = ({ onExplore, onViewEvents }) => (
  <section className="relative overflow-hidden bg-slate-50 border-b border-slate-200">
    <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
          Join Volunteer Armies. <br />
          <span className="text-blue-600">Create Real Impact.</span>
        </h1>
        <p className="text-lg text-slate-600 mb-8 max-w-lg">
          Empowering citizens to organize, participate, and build a stronger
          community through structured volunteer action and recognized
          contributions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onExplore}
            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
          >
            Explore Volunteer Groups <Search size={20} />
          </button>
          <button
            onClick={onViewEvents}
            className="px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            View My Events
          </button>
        </div>
      </div>

      <div className="hidden lg:flex justify-center items-center relative group">
        <div className="absolute w-[120%] h-[120%] bg-gradient-to-br from-blue-50 via-slate-50 to-transparent blur-3xl opacity-60 transition duration-500 group-hover:opacity-80" />
        <div className="relative w-full max-w-[580px] aspect-[4/3] overflow-hidden rounded-[2rem] transition duration-500 ease-out group-hover:-translate-y-2">
          <img
            src={armyhome}
            alt="Citizens actively participating in community volunteering"
            draggable={false}
            className="w-full h-full object-cover scale-[1.1] transition duration-700 ease-out group-hover:scale-[1.15]"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,white_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
