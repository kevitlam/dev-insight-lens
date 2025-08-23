import { useState } from 'react';

const GitHubInput = ({ value, onChange, onAnalyze, disabled }) => {
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!value.trim()) {
      setIsValid(false);
      return;
    }

    const githubUrlPattern = /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9-_]+$/;
    if (!githubUrlPattern.test(value.trim())) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
    onAnalyze(value.trim());
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mx-2 sm:mx-0">
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <input
            type="url"
            value={value}
            onChange={(e) => { onChange(e.target.value); setIsValid(true); }}
            placeholder="https://github.com/username"
            disabled={disabled}
            className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 border-2 rounded-lg sm:rounded-xl text-sm sm:text-base focus:outline-none focus:ring-0 transition-all duration-200 ${
              !isValid 
                ? 'border-red-300 bg-red-50 text-red-900 placeholder-red-400' 
                : disabled 
                  ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed' 
                  : 'border-gray-200 focus:border-gray-400 bg-white hover:border-gray-300'
            }`}
          />
          {!isValid && (
            <p className="mt-2 text-xs sm:text-sm text-red-600 flex items-center space-x-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Please enter a valid GitHub profile URL</span>
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className={`w-full py-3 sm:py-3.5 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base border-2 ${
            disabled || !value.trim()
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
              : 'bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg border-gray-900 hover:border-gray-800 transform hover:-translate-y-0.5'
          }`}
        >
          {disabled ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              <span>Analyzing...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Analyze Profile</span>
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default GitHubInput;