export function extractErrorMessage(error) {
  if(error?.status === 500){
    return "We’re facing a temporary issue while processing your request. Our team is working on it. Please try again shortly."
  }
  if (error?.data?.message) return error?.data?.message;
  return "Something went wrong. Please try again.";
}
