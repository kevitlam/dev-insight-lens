const LoadingState = () => {
  return (
    <div className="text-center py-12 sm:py-16 px-4">
      {/* Improved loading animation */}
      <div className="relative inline-flex items-center justify-center mb-4 sm:mb-6">
        {/* Outer rotating ring */}
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-3 sm:border-4 border-gray-200 rounded-full animate-spin border-t-gray-900"></div>
        {/* Inner pulsing dot */}
        <div className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-gray-900 rounded-full animate-pulse"></div>
      </div>
      
      {/* Loading text with typing animation */}
      <div className="space-y-1 sm:space-y-2">
        <h3 className="text-base sm:text-lg font-medium text-gray-900">Analyzing Profile</h3>
        <div className="flex items-center justify-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 max-w-xs sm:max-w-sm mx-auto px-2">
          Reviewing repositories and analyzing code patterns...
        </p>
      </div>
    </div>
  );
};

export default LoadingState;