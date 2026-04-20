import { HomeIcons as Icons } from "../../ui/HomeIcons";
import { useNavigate } from "react-router-dom";

const actions = [
  { title: "Raise Issues", icon: <Icons.Issues />,path:"/complaints"},
  { title: "Join Volunteer Army", icon: <Icons.Army />,path:"/volunteer-army/groups"},
  { title: "Take Polls", icon: <Icons.Polls />,path:"/poll/home "},
  { title: "Civic Talk", icon: <Icons.Talk />,path:"/forum"},

];

const QuickActions = () => {
  const navigate = useNavigate();
  return (
    <section  className="relative z-10 max-w-7xl mx-auto px-4 -mt-20">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {actions.map((a) => (
          <div
            onClick={() => {navigate(a.path)}}
            key={a.title}
            className="
             cursor-pointer
              group relative rounded-3xl p-8
              bg-white/80 backdrop-blur-xl
              border border-slate-200/60
              transition-all duration-300
              hover:-translate-y-2 hover:shadow-xl
            "
          >
            {/* Icon container */}
            <div
              className="
                w-14 h-14 mb-6 rounded-2xl
                flex items-center justify-center
                bg-blue-100 text-blue-600
                transition-all duration-300
                group-hover:bg-blue-600 group-hover:text-white
                group-hover:scale-110
              "
            >
              {a.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              {a.title}
            </h3>

            {/* Micro copy */}
            <p className="text-sm text-slate-500 leading-relaxed">
              {getActionDescription(a.title)}
            </p>

            {/* Subtle bottom glow */}
            <div className="
              absolute inset-x-6 bottom-0 h-px
              bg-gradient-to-r from-transparent via-blue-300/60 to-transparent
              opacity-0 group-hover:opacity-100 transition
            " />
          </div>
        ))}
      </div>
    </section>
  );
};

const getActionDescription = (title) => {
  switch (title) {
    case "Raise Issues":
      return "Report problems in your area and help improve public spaces.";
    case "Civic Talk":
      return "Discuss ideas and concerns with people from your community.";
    case "Join Volunteer Army":
      return "Be part of local efforts that create visible change.";
    case "Take Polls":
      return "Share your voice on issues that affect daily life.";
    default:
      return "";
  }
};


export default QuickActions;
