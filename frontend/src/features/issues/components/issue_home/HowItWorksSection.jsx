import Step from "./Step";

const HowItWorksSection = () => (
  <section className="py-24 bg-gradient-to-b from-blue-100 to-blue-700 text-white">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-3xl font-bold">Simple, Transparent Process</h2>
      <p className="mt-4">We bridge citizens and administration.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
        <Step icon="1" title="Report" text="Submit issue details." />
        <Step icon="2" title="Review" text="Authorities review it." />
        <Step icon="3" title="Resolve" text="Track the progress." />
        <Step icon="4" title="Feedback" text="Confirm closure." />
      </div>
    </div>
  </section>
);

export default HowItWorksSection;