export function countIssuesSubmittedToday(issues) {
  const today = new Date();

  return issues.filter((issue) => {
    const submitted = new Date(issue.submitted_at);

    return (
      submitted.getFullYear() === today.getFullYear() &&
      submitted.getMonth() === today.getMonth() &&
      submitted.getDate() === today.getDate()
    );
  }).length;
}