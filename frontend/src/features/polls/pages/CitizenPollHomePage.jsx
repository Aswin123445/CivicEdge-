import pollHeroPlaceholder from "../../../assets/poll_home.webp";
import PollHero from "../components/citizen_poll_home_page/PollHero";
import PollList from "../components/citizen_poll_home_page/PollList";
import PollSidebar from "../components/citizen_poll_home_page/PollSidebar";
import usePollHome from "../hooks/citizen/pollHome";

const CitizenPollHomePage = () => {
  const { pollHome, isPollHomeLoading, isPollHomeFetching, navigate,handleSeeAll ,handleMyVotes} = usePollHome();
  const isLoading = isPollHomeLoading || isPollHomeFetching;
  const systemVotes = pollHome?.total_system_votes ?? 0;
  const polls = pollHome?.polls ?? [];

  const handleViewDetails = (poll) => {
    navigate(`/polls/list/${poll?.id}`);
  };

  const handleExplore = () => {
    // TODO: scroll to polls section or navigate
    document.getElementById("active-polls")?.scrollIntoView({ behavior: "smooth" });
  };



  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">

      {/* Hero */}
      <PollHero
        stats={isLoading ? null : systemVotes}
        isLoading={isLoading}
        heroImageSrc={pollHeroPlaceholder}
        onExplore={handleExplore}
        onMyVotes={handleMyVotes}
      />

      {/* Main + Sidebar */}
      <main className="max-w-7xl mx-auto px-6 py-12" id="active-polls">
        <div className="grid grid-cols-12 gap-8">

          {/* Main column */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            <PollList
              polls={isLoading ? null : polls}
              isLoading={isLoading}
              activePolls={isLoading ? null : pollHome?.total_active_polls}
              onViewDetails={handleViewDetails}
              onSeeAll={handleSeeAll}
            />
          </div>

          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-4 space-y-8">
            <PollSidebar isLoading={isLoading} />
          </aside>

        </div>
      </main>

      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CitizenPollHomePage;