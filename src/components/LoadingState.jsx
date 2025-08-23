const LoadingState = () => {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-8 h-8 mb-4">
        <svg className="animate-spin w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="opacity-25"></circle>
          <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <p className="text-gray-600 text-sm">Analyzing profile...</p>
    </div>
  );
};

export default LoadingState;