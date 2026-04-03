// components/volunteer/UpcomingEvents.jsx
import { Calendar, Clock, ArrowRight } from "lucide-react";

/**
 * @param {Array}    events         - [{ id, title, date, group }]
 * @param {function} onViewSchedule - () => void
 * @param {function} onEventClick   - (id) => void
 */
const UpcomingEvents = ({ events = [], onViewSchedule, onEventClick }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
      <Calendar size={18} className="text-blue-600" />
      My Upcoming Events
    </h4>

    {events.length === 0 ? (
      <p className="text-sm text-slate-400 text-center py-4">
        No upcoming events.
      </p>
    ) : (
      <div  className="space-y-4 ">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => onEventClick({group_id: event.group_id, event_id: event.event_id})}
            className="p-3 bg-slate-50 rounded-lg border border-slate-100 cursor-pointer "
          >
            <div className="text-sm font-bold text-slate-800 mb-1">
              {event.title}
            </div>
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Clock size={12} /> {event.date}
              </span>
              <span className="font-medium text-blue-600">{event.group}</span>
            </div>
          </div>
        ))}
      </div>
    )}

    <button
      onClick={onViewSchedule}
      className="w-full mt-4 text-sm font-semibold text-slate-500 hover:text-blue-600 py-2 border border-dashed border-slate-300 rounded-lg transition-colors flex items-center justify-center gap-1"
    >
      View Full Schedule <ArrowRight size={14} />
    </button>
  </div>
);

export default UpcomingEvents;
