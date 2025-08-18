import { useState, useEffect } from 'react';
import { isRateLimitError, isNetworkError } from '../utils/errorHandler';

const ErrorMessage = ({ error, onRetry }) => {
  const [countdown, setCountdown] = useState(0);
  const isRateLimit = isRateLimitError({ message: error });
  const isNetwork = isNetworkError({ message: error });

  useEffect(() => {
    if (isRateLimit && countdown === 0) {
      // Start 15-minute countdown for rate limit errors
      setCountdown(15 * 60);
    }
  }, [isRateLimit]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getErrorIcon = () => {
    if (isRateLimit) return '⏰';
    if (isNetwork) return '🌐';
    return '⚠️';
  };

  const getErrorTitle = () => {
    if (isRateLimit) return 'Rate Limited';
    if (isNetwork) return 'Connection Error';
    return 'Analysis Failed';
  };

  return (
    <div className="bg-background rounded-lg shadow-sm border border-destructive/20 p-6 text-center">
      <div className="text-destructive text-4xl mb-4">{getErrorIcon()}</div>
      <h3 className="text-lg font-semibold text-destructive mb-2">{getErrorTitle()}</h3>
      <p className="text-destructive/80 mb-4">{error}</p>
      
      {isRateLimit && countdown > 0 && (
        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-orange-800 text-sm">
            You can try again in: <span className="font-mono font-bold">{formatTime(countdown)}</span>
          </p>
        </div>
      )}
      
      <div className="flex gap-2 justify-center">
        <button 
          onClick={onRetry}
          disabled={isRateLimit && countdown > 0}
          className={`px-6 py-2 rounded-lg font-medium ${
            isRateLimit && countdown > 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
          }`}
        >
          {isRateLimit && countdown > 0 ? 'Please Wait' : 'Try Again'}
        </button>
        
        {isNetwork && (
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Refresh Page
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;