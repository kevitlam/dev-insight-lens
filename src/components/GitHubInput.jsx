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
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="url"
            value={value}
            onChange={(e) => { onChange(e.target.value); setIsValid(true); }}
            placeholder="https://github.com/username"
            disabled={disabled}
            className={`w-full px-4 py-3 border-2 rounded-lg text-base focus:outline-none focus:ring-0 transition-colors ${
              !isValid 
                ? 'border-red-400 bg-red-50' 
                : disabled 
                  ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed' 
                  : 'border-gray-200 focus:border-gray-900 bg-white'
            }`}
          />
          {!isValid && (
            <p className="mt-2 text-sm text-red-600">
              Please enter a valid GitHub profile URL
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
            disabled || !value.trim()
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
        >
          {disabled ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>

      <div className="text-center">
        <span className="text-xs text-gray-500 mr-3">Try:</span>
        {['octocat', 'defunkt', 'mojombo'].map((username) => (
          <button
            key={username}
            type="button"
            onClick={() => onChange(`https://github.com/${username}`)}
            disabled={disabled}
            className="text-xs text-gray-500 hover:text-gray-900 underline mr-3 disabled:text-gray-300"
          >
            {username}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GitHubInput;