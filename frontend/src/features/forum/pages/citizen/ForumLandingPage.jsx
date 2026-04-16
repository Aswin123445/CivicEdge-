import { PlusCircle, Search, ArrowRight, Notebook } from "lucide-react";
import forum_home from "../../../../assets/forum_home.webp";
import { useNavigate } from "react-router-dom";


const HeroSection = ({onCreatePost,onExplore}) => {

  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200 mt-8">
      <div className="max-w-7xl mx-auto px-6 py-14 lg:py-6 grid lg:grid-cols-2 gap-10 items-center">
        
        <div>
          <h1 className="text-3xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-4">
            Community Discussions <br />
            <span className="text-blue-600">
             Built Around Your Ideas and Concerns
            </span>
          </h1>

          <p className="text-base lg:text-lg text-slate-600 mb-6 max-w-lg">
            Explore discussions, share ideas, raise concerns, and collaborate with 
            your community to improve everyday life.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onCreatePost}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              Create Post
              <PlusCircle size={18} />
            </button>

            {onExplore && (
              <button
                onClick={onExplore}
                className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition"
              >
                Explore Discussions
              </button>
            )}
          </div>
        </div>

        <div className="hidden lg:flex justify-center items-center relative group">
          <div className="absolute w-[120%] h-[120%] bg-gradient-to-br from-blue-50 via-white to-transparent blur-3xl opacity-50 transition duration-500 group-hover:opacity-70" />
          
          <div className="relative w-full max-w-[560px] aspect-[4/3] overflow-hidden rounded-[1.5rem] transition duration-500 ease-out group-hover:-translate-y-1">
            <img
              src={forum_home}
              alt="Community members discussing civic issues"
              draggable={false}
              className="w-full h-full object-cover scale-[1.05] transition duration-700 ease-out group-hover:scale-[1.08]"
            />

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,white_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

// 2. FEATURE CARD COMPONENT
const FeatureCard = ({ icon: Icon, title, description ,route,onClick}) => (
  <div onClick={() => {onClick(route)}} className="cursor-pointer bg-white border border-slate-200 p-6 rounded-xl transition-all duration-300 hover:bg-slate-50 group">
    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 transition-colors group-hover:bg-blue-100">
      <Icon className="text-blue-600 w-6 h-6" />
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
  </div>
);

// 3. MAIN PAGE COMPONENT
const ForumLandingPage = () => {
  const navigate = useNavigate();
  // Navigation Handlers (Mock logic for demonstration)
  const handleExplore = () => {
    navigate("/forum/home");
  };
  const onExplore = () => {
      navigate("/forum/home");
  }
  const onCreatePost = () => {
      navigate("/forum/posts/create");
  }
  const handleMyActivity = () => {
    navigate("/forum/my-activity");
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection 
        onCreatePost={onCreatePost} 
        onExplore={handleExplore} 
      />

      {/* Feature Section: Explain Platform */}
      <section className="py-16 lg:py-7 ">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">
              How the Forum Works
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Empowering citizens to take charge of their community through structured dialogue and collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              onClick={handleExplore}
              icon={Search}
              title="Explore Discussions"
              description="Browse civic issues raised by others in your community. Stay informed about what matters locally."
              route="/forum/home"
            />
            <FeatureCard 
              onClick={handleMyActivity}
              icon={Notebook}
              title="My Activity"
              description="Discussions you've created and participated in. Keep track of your contributions."
            />
            <FeatureCard 
              icon={PlusCircle}
              title="Start a Discussion"
              description="Share your perspective,ideas,proposals and suggestions with others in your community."
              onClick={onCreatePost}

            />
          </div>
        </div>
      </section>

      {/* CTA Section: Navigation to Categories */}
      <section className="py-10 border-t border-slate-100 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Start Exploring Discussions
            </h2>
            <p className="text-slate-500 text-lg max-w-lg mx-auto leading-relaxed">
              Find your community, join relevant categories, and contribute your voice to the conversation today.
            </p>
          </div>

          <div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForumLandingPage;