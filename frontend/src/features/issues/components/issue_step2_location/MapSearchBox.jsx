import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

import Portal from "../../ui/Portal";
import useLocationUiHook from "../../hooks/loactionUiHook";


const MapSearchBox = ({ onSelect }) => {
  const {
    containerRef,
    inputRef, 
    query,
    setQuery,
    results,
    showResults,
    dropdownStyle,
    handleSelect
  } = useLocationUiHook(onSelect);

  const handleSearchChange = (e) => {
    if (!results.includes(e.target.value)) {
      setQuery(e.target.value);
    }
  }
  return (
    <>
      {/*  Search Input */}
      <div ref={containerRef} className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {handleSearchChange(e)}}
          placeholder="Search place or landmark"
          className="
            w-full pl-11 pr-4 py-2.5
            bg-white
            border border-slate-200
            rounded-xl
            text-sm font-medium
            shadow-sm
            focus:outline-none
            focus:ring-2 focus:ring-blue-500/20
            focus:border-blue-600
          "
        />
      </div>

      {/*  Results (Portal) */}
      <AnimatePresence>
        {showResults && results.length > 0 && dropdownStyle && (
          <Portal>
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={dropdownStyle}
              className="
                fixed
                bg-white
                border border-slate-200
                rounded-xl
                shadow-lg
                overflow-hidden
                z-[9999]
              "
            >
              {results.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="
                    w-full px-3 py-2.5
                    text-left
                    hover:bg-slate-50
                    transition-colors
                    border-b last:border-b-0
                  "
                >
                  <p className="text-sm font-semibold text-slate-800 leading-tight">
                    {item.name}
                  </p>
                  <p
                    className="text-xs text-slate-400 truncate"
                    title={item.full_name}
                  >
                    {item.full_name}
                  </p>
                </button>
              ))}
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
};

export default MapSearchBox;