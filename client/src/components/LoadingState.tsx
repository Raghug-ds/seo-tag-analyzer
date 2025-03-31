const LoadingState = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-8 text-center">
      <div className="flex flex-col items-center justify-center py-12">
        <svg className="animate-spin h-10 w-10 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-lg font-medium text-gray-900">Analyzing Meta Tags</h3>
        <p className="mt-1 text-sm text-gray-500">This may take a few moments...</p>
      </div>
    </div>
  );
};

export default LoadingState;
