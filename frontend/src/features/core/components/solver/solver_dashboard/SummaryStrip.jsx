import React from 'react'
import { motion, AnimatePresence } from "framer-motion";

const SummaryStrip = ({ STATS, statVariants, pulseAnimation, AnimatedNumber }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.id}
              custom={index}
              variants={statVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -3 }}
              {...(stat.active ? pulseAnimation : {})}
              className={`
                p-4 rounded-xl border
                ${stat.border} ${stat.color}
                flex items-center justify-between
                shadow-sm transition-all
              `}
            >
              <div>
                <p className="text-slate-500 text-xs font-semibold mb-1 uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className={`text-3xl font-black ${stat.text}`}>
                  <AnimatedNumber value={stat.count} />
                </p>
              </div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.4 }}
                transition={{ delay: 0.2 }}
                className={`${stat.text}`}
              >
                {stat.icon}
              </motion.div>
            </motion.div>
          ))}
        </div>
  )
}

export default SummaryStrip
