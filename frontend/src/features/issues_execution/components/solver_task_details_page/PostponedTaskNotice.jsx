const PostponedTaskNotice = () => {
  return (
    <div className="mb-4 rounded-xl border border-yellow-400 bg-yellow-50 px-4 py-3">
      <p className="text-sm font-semibold text-yellow-700">
        Task Postponed by Admin
      </p>

      <p className="mt-1 text-sm text-yellow-600">
          This task has been postponed by the admin. You will be notified when the task is un-postponed.
      </p>
    </div>
  );
};

export default PostponedTaskNotice;
