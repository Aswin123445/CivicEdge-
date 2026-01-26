import { Menu } from "lucide-react";

export default function AdminDropDown({toggleBar,togleState,buttonRef}) {
  return (
    <button ref={buttonRef} onClick={() => toggleBar(!togleState)} className="flex items-center gap-2 text-white hover:text-[#CFCFCF]">
      <Menu size={28} />
      
    </button>
  );
}

