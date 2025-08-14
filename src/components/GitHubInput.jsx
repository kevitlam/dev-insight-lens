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
    <div className="bg-background rounded-lg shadow-sm border p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            GitHub Profile URL
          </label>
          <input
            type="url"
            value={value}
            onChange={(e) => { onChange(e.target.value); setIsValid(true); }}
            placeholder="https://github.com/username"
            disabled={disabled}
            className={`w-full px-4 py-3 border rounded-lg text-lg focus:ring-2 focus:ring-primary ${
              !isValid ? 'border-destructive bg-destructive/10' : 'border-border'
            } ${disabled ? 'bg-muted cursor-not-allowed' : ''}`}
          />
          {!isValid && (
            <p className="mt-2 text-sm text-destructive">
              Please enter a valid GitHub profile URL (e.g., https://github.com/username)
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">Try examples:</span>
          {['octocat', 'defunkt', 'mojombo'].map((username) => (
            <button
              key={username}
              type="button"
              onClick={() => onChange(`https://github.com/${username}`)}
              disabled={disabled}
              className="text-sm text-primary hover:text-primary/80 underline disabled:text-muted-foreground"
            >
              {username}
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all ${
            disabled || !value.trim()
              ? 'bg-muted text-muted-foreground cursor-not-allowed'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          }`}
        >
          {disabled ? 'Analyzing...' : 'Analyze Developer 🚀'}
        </button>
      </form>
    </div>
  );
};

export default GitHubInput;