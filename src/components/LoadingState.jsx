const LoadingState = () => {
  return (
    <div className="text-center py-16">
      {/* Improved loading animation */}
      <div className="relative inline-flex items-center justify-center mb-6">
        {/* Outer rotating ring */}
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-gray-900"></div>
        {/* Inner pulsing dot */}
        <div className="absolute w-4 h-4 bg-gray-900 rounded-full animate-pulse"></div>
      </div>
      
      {/* Loading text with typing animation */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-900">Analyzing Profile</h3>
        <div className="flex items-center justify-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
        <p className="text-sm text-gray-500 max-w-sm mx-auto">
          Reviewing repositories and analyzing code patterns...
        </p>
      </div>
    </div>
  );
};

export default LoadingState;