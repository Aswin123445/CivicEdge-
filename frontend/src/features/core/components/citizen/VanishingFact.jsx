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
<p
  className="
    font-bold text-white/75 tracking-wide leading-relaxed
    text-sm sm:text-base md:text-lg lg:text-xl
    max-w-[180px] sm:max-w-[220px] md:max-w-[280px] lg:max-w-[340px]
  "
>
  {AWARENESS_FACTS[index]}
</p>

    </div>
  );
};
export default VanishingFact;
