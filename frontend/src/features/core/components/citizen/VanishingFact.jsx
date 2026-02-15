import { AWARENESS_FACTS } from "../../../../constants/citizen_home";
import useCitizenUi from "../../hooks/citizen/uiHooks";
const VanishingFact = () => {
  const { index, visible } = useCitizenUi();

  return (
    <div
      className={`transition-opacity duration-700 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <p className="text-xl font-bold text-white/75 max-w-[220px] leading-relaxed tracking-wide">
        {AWARENESS_FACTS[index]}
      </p>
    </div>
  );
};
export default VanishingFact;
