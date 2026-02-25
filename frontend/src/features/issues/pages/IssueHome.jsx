import ActionStrip from '../components/issue_home/ActionStrip';
import CategorySection from '../components/issue_home/CategorySection';
import HeroSection from '../components/issue_home/HeroSection';
import HowItWorksSection from '../components/issue_home/HowItWorksSection';

const IssueHome = () => (
  <div className="min-h-screen bg-slate-50">
    <HeroSection />
    <ActionStrip />
    <CategorySection />
    <HowItWorksSection />
  </div>
);

export default IssueHome;