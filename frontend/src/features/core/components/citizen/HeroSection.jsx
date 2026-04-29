import { useNavigate } from "react-router-dom";
import HeroBanner from "../../../../assets/herosection.webp";
import VanishingFact from "./VanishingFact";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-gradient-to-b from-blue-600 to-white text-white pt-16 pb-28">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            When Citizens Care,
            <br />
            Society Transforms
          </h1>

          <p className="text-blue-100 text-lg mb-8 max-w-lg">
            CivicEdge empowers citizens to report issues and work together.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/complaints")}
              className="px-8 py-3 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              Report An Issue
            </button>
            <button
              onClick={() => navigate("/home/know-more")}
              className="px-8 py-3 border-2 border-white/50 rounded-xl hover:bg-white/10 transition-colors"
            >
              Know More
            </button>
          </div>
        </div>

        {/* Right: Image / Illustration */}
        <div className="hidden md:flex justify-start">
          <div className="w-full max-w-lg h-[420px] lg:h-[480px] xl:h-[450px]">
            <img
              src={HeroBanner}
              alt="Community working together"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        {/* Awareness Facts – lg & above only */}
        <div className="hidden lg:block absolute top-24 right-12">
          <VanishingFact />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
