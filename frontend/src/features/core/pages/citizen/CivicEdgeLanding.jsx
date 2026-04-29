import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Users,
  Vote,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Shield,
  Zap,
  Globe,
  Heart,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import KnowMoreBanner from "../../../../assets/know_more_hero_section.webp";
import whyCivicEdge from "../../../../assets/why_exist.webp";
const Hero = () => {
    const navigate = useNavigate();
    return (
      <section className="relative pt-6 pb-20 lg:pt-5 lg:pb-20 overflow-hidden bg-[#F8FAFC]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-50" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-200 rounded-full blur-[100px] opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-blue-600 uppercase bg-blue-50 rounded-full">
                Built for citizens who care
              </span>
              <h1 className="text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
                Better Citizens.
                <br />
                <span className="text-blue-600">Better Cities.</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
                CivicEdge bridges people and governance to create cleaner,
                smarter, and more responsible communities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/home")}
                  className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2 group"
                >
                  Explore CivicEdge{" "}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate("/volunteer-army")}
                  className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-2xl font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition-all"
                >
                  Join the Movement
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="relative z-10 bg-white p-4 rounded-[2.5rem] shadow-2xl shadow-blue-100 border border-white">
                <img
                  src={KnowMoreBanner}
                  alt="Smart City Infrastructure"
                  className="rounded-[2rem] w-full object-cover aspect-[4/3]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
}

const WhySection = () => (
  <section className="py-4 bg-white" id="about">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="order-2 lg:order-1">
          <div className="relative">
            <img
              src={whyCivicEdge}
              alt="Community Collaboration"
              className="rounded-3xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-blue-600/10 rounded-3xl"></div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">
            Why CivicEdge Exists
          </h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p>
              Many cities struggle not because people don’t care, but because
              citizens and governance often remain disconnected.
            </p>
            <p className="font-medium text-slate-900">
              When people feel unheard, they stop participating. When
              participation falls, civic responsibility weakens.
            </p>
            <p>
              Public spaces are neglected, trust declines, and problems grow.
              CivicEdge exists to close this gap — creating a bridge where
              citizens can engage, contribute, and feel responsible for the
              communities they live in.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Features = () => {
  const features = [
    {
      title: "Smart Issue Resolution System",
      desc: "Citizens can report civic problems such as potholes, waste, and infrastructure issues with location and images. Each report enters a transparent workflow for verified resolution.",
      icon: <MapPin className="w-8 h-8 text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      title: "Volunteer & Community Action",
      desc: "Citizens are more than observers — they are contributors. Join volunteer groups, support local initiatives, and engage in activities that improve your neighborhood together.",
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      bg: "bg-indigo-50",
    },
    {
      title: "Polling for Local Decisions",
      desc: "Civic participation shouldn't happen once every few years. Participate in local polls on development ideas and community decisions that affect your daily life.",
      icon: <Vote className="w-8 h-8 text-cyan-600" />,
      bg: "bg-cyan-50",
    },
    {
      title: "Public Forum & Citizen Voice",
      desc: "Share ideas, suggestions, and constructive criticism in an open space. Create dialogue and transparency between people and governance.",
      icon: <MessageSquare className="w-8 h-8 text-blue-500" />,
      bg: "bg-blue-50",
    },
  ];

  return (
    <section className="py-12 bg-slate-50" id="features">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          What CivicEdge Does
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Four systems designed to turn passive residents into active citizens.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
        {features.map((f, i) => (
          <motion.div
            whileHover={{ y: -10 }}
            key={i}
            className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all"
          >
            <div
              className={`w-16 h-16 ${f.bg} rounded-2xl flex items-center justify-center mb-6`}
            >
              {f.icon}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              {f.title}
            </h3>
            <p className="text-slate-600 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Comparison = () => (
  <section className="py-10 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          Why CivicEdge Is Different
        </h2>
        <p className="text-slate-600 text-lg">
          Most platforms manage problems. CivicEdge builds responsibility.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-stretch relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
          <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center font-bold text-blue-600 z-10 border border-slate-100">
            VS
          </div>
        </div>

        <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
          <h4 className="text-xl font-bold text-slate-400 mb-8 uppercase tracking-widest text-center">
            Traditional Civic Apps
          </h4>
          <ul className="space-y-6">
            {[
              "Complaint only",
              "Reactive systems",
              "Limited transparency",
              "Passive users",
              "Occasional engagement",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-4 text-slate-500 font-medium"
              >
                <div className="w-2 h-2 rounded-full bg-slate-300" /> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-blue-600 p-10 rounded-[2.5rem] shadow-2xl shadow-blue-200">
          <h4 className="text-xl font-bold text-blue-100 mb-8 uppercase tracking-widest text-center">
            CivicEdge
          </h4>
          <ul className="space-y-6">
            {[
              "Full civic ecosystem",
              "Preventive culture",
              "Transparent workflows",
              "Active contributors",
              "Continuous participation",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-4 text-white font-semibold"
              >
                <CheckCircle2 className="text-blue-300 w-6 h-6" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 max-w-3xl mx-auto text-center">
        <p className="text-xl text-slate-600 italic">
          "While many platforms solve isolated civic problems, CivicEdge
          addresses the deeper challenge: creating communities where citizens
          actively care, participate, and collaborate with governance."
        </p>
      </div>
    </div>
  </section>
);

const FutureVision = () => {
  const visions = [
    {
      title: "Financially Independent Civic Model",
      desc: "Events, sponsorships, and public-private partnerships.",
    },
    {
      title: "Reconnecting Youth With Governance",
      desc: "Concerts, youth programs, and engagement events.",
    },
    {
      title: "Smart Civic Revenue Reinvestment",
      desc: "Directly reinvesting funds into critical issue resolution.",
    },
    {
      title: "Contractor & Execution Network",
      desc: "Verified contractors for rapid infrastructure work.",
    },
    {
      title: "Full Civic Operations Platform",
      desc: "Connecting citizens, admins, solvers, and volunteers.",
    },
  ];

  return (
    <section
      className="py-24 bg-slate-900 text-white overflow-hidden"
      id="vision"
    >
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[150px]" />

        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-4">Future Vision</h2>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Building a self-sustaining civic ecosystem for the cities of
            tomorrow. Its long-term vision is to become a sustainable cycle
            where participation and financial independence work together.
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {visions.map((v, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
            >
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl mb-6 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <Zap className="w-6 h-6 text-blue-400 group-hover:text-white" />
              </div>
              <h4 className="font-bold text-lg mb-3">{v.title}</h4>
              <p className="text-sm text-slate-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
    const navigate = useNavigate();
    return (
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-blue-600 rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 border-4 border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 border-4 border-white rounded-full translate-x-1/3 translate-y-1/3" />
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">
                Better Citizens. Better Cities.
              </h2>
              <p className="text-blue-100 text-xl mb-12 max-w-2xl mx-auto">
                Join the movement toward more responsible communities and be the
                change your city needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={() => navigate("/home")}
                  className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-xl hover:bg-blue-50 transition-all shadow-xl"
                >
                  Explore CivicEdge
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

// --- Main Page ---

const CivicEdgeLanding = () => {
  return (
    <div className="font-sans text-slate-900 antialiased">
      <Hero />
      <WhySection />
      <Features />

      {/* Problems Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Key Problems CivicEdge Solves
            </h2>
            <p className="text-slate-600 text-lg">
              Addressing the behaviors and system gaps that hold communities
              back.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Citizens Feel Unheard",
                desc: "Providing a direct, verified channel to local governance.",
              },
              {
                title: "Low Commitment",
                desc: "Gamifying and incentivizing civic responsibility.",
              },
              {
                title: "Lack of Awareness",
                desc: "Visualizing the direct impact of individual actions.",
              },
              {
                title: "Slow Resolution",
                desc: "Real-time task assignment to verified solvers.",
              },
              {
                title: "Weak Trust",
                desc: "Total transparency in the issue resolution pipeline.",
              },
              {
                title: "Rare Participation",
                desc: "Turning civic duty into a daily digital habit.",
              },
            ].map((p, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-[#F8FAFC] border border-slate-100 hover:bg-white hover:shadow-xl transition-all"
              >
                <h4 className="font-bold text-slate-900 mb-2">{p.title}</h4>
                <p className="text-slate-500 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Comparison />
      <FutureVision />

      {/* Purpose Section */}
      <section className="py-32 relative overflow-hidden bg-blue-50">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">
            Why We Built CivicEdge
          </h2>
          <div className="text-xl text-slate-600 leading-relaxed space-y-6">
            <p>
              CivicEdge was built from a simple belief:{" "}
              <strong>people care more when they feel connected.</strong>
            </p>
            <p>
              Many public problems are not caused only by poor infrastructure,
              but by the growing distance between citizens and governance. When
              people feel unheard, responsibility fades. When responsibility
              fades, communities suffer.
            </p>
            <p className="text-blue-600 font-semibold italic">
              CivicEdge was created to rebuild that connection — so citizens
              participate, contribute, and care for their city like it is their
              own home.
            </p>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default CivicEdgeLanding;
