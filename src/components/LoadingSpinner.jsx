const LoadingSpinner = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-200"
      role="status"
      aria-label="Loading"
    >
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin"
            aria-hidden="true"
          ></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
