import DetailItem from "../../ui/admin_issue_assignment_page/DetailItem";
import { formatDate } from "../../../../utils/datenormalize";

const IssueDetailsCard = ({ issue }) => {
  const date = formatDate(issue?.created_at);
  return (
    <section className="bg-[#1e1e1e] border border-slate-700 rounded-xl overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-slate-700 bg-slate-800/30">
        <h2 className="font-semibold text-slate-200 text-lg">
          Issue Intelligence
        </h2>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">{issue?.title}</h3>
          <p className="text-slate-400 leading-relaxed italic border-l-2 border-slate-700 pl-4">
            "{issue.description}"
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
          <DetailItem label="Category" value={issue?.category_name} />
          <DetailItem label="Priority Zone" value={issue?.location?.zone} highlight />
          <DetailItem label="Reporter" value={issue?.reporter_mail} />
          <DetailItem
            label="Submitted On"
            value={date}
          />
        </div>
      </div>

      {/* Citizen Evidence Placeholder */}
      <div className="bg-[#1e1e1e] p-4 border-t border-slate-700">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {issue?.evidences?.length ? (
            issue.evidences.map((img) => (
              <div
                key={img.id}
                className="flex-shrink-0 w-64 aspect-video rounded-lg overflow-hidden bg-slate-800"
              >
                <img
                  src={img.cloudinary_url}
                  alt="Evidence"
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          ) : (
            <div className="h-48 w-full flex items-center justify-center text-slate-600 text-sm">
              Visual Evidence Preview Unavailable
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default IssueDetailsCard;
