import { useState, useEffect } from 'react';
import { isRateLimitError, isNetworkError } from '../utils/errorHandler';

const ErrorMessage = ({ error, onRetry }) => {
  const [countdown, setCountdown] = useState(0);
  const isRateLimit = isRateLimitError({ message: error });
  const isNetwork = isNetworkError({ message: error });

  useEffect(() => {
    if (isRateLimit && countdown === 0) {
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

  return (
    <div className="text-center py-12">
      <p className="text-red-600 text-sm mb-4">{error}</p>
      
      {isRateLimit && countdown > 0 && (
        <p className="text-orange-600 text-xs mb-4">
          Try again in {formatTime(countdown)}
        </p>
      )}
      
      <div className="flex gap-2 justify-center">
        <button 
          onClick={onRetry}
          disabled={isRateLimit && countdown > 0}
          className={`px-4 py-2 rounded-lg text-sm ${
            isRateLimit && countdown > 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          {isRateLimit && countdown > 0 ? 'Please Wait' : 'Try Again'}
        </button>
        
        {isNetwork && (
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800"
          >
            Refresh
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;