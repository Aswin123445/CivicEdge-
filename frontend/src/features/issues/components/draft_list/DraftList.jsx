import DraftCardSkeleton from "../../ui/skeltons/DraftCardSkeleton";
import DraftCard from "./DraftCard";

const DraftList = ({ drafts, onDeleteRequest,draftsLoading }) => {
  if (draftsLoading) return <DraftCardSkeleton count={3}/>;
  return (
    <div className="space-y-4">
      {drafts.map((draft) => (
        <DraftCard
          key={draft?.id}
          draft={draft}
          onDeleteRequest={() => onDeleteRequest(draft)}
        />
      ))}
    </div>
  );
};

export default DraftList;