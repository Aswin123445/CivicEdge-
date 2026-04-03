// components/volunteer/VolunteerJourney.jsx

const STEPS = [
  { number: "1", title: "Join a Group",     desc: "Find a cause that matches your skills" },
  { number: "2", title: "Participate",      desc: "Sign up for local events & tasks" },
  { number: "3", title: "Log Attendance",   desc: "Verify your impact on the ground" },
  { number: "4", title: "Earn Awards",      desc: "Get recognized for your service" },
];

const StepCard = ({ number, title, desc }) => (
  <div className="flex flex-col items-center text-center p-4">
    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mb-4">
      {number}
    </div>
    <h4 className="font-bold text-white mb-1">{title}</h4>
    <p className="text-sm text-slate-400">{desc}</p>
  </div>
);

const VolunteerJourney = () => (
  <section className="bg-slate-900 text-white rounded-2xl p-8 lg:p-12">
    <div className="text-center mb-10">
      <h3 className="text-2xl font-bold mb-2">The Volunteer Journey</h3>
      <p className="text-slate-400">Four simple steps to start making a difference</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
      <div className="hidden lg:block absolute top-5 left-20 right-20 h-0.5 bg-slate-800 z-0" />
      {STEPS.map((step) => (
        <div key={step.number} className="relative z-10">
          <StepCard {...step} />
        </div>
      ))}
    </div>
  </section>
);

export default VolunteerJourney;
