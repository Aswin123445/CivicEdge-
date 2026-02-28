const DottedLoaderIndicator = ({className = ''}) => (
  <div className={`h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin ${className}`} />
);

export default DottedLoaderIndicator;