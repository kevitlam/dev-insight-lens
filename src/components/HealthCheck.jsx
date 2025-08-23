import { useState, useEffect } from 'react';
import { checkBackendHealth } from '../services/api';

const HealthCheck = () => {
  const [healthStatus, setHealthStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await checkBackendHealth();
        setHealthStatus(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
        Checking...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-xs text-red-500">
        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
        Offline
      </div>
    );
  }

  if (healthStatus) {
    return (
      <div className="flex items-center gap-2 text-xs text-green-600">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
        Online
      </div>
    );
  }

  return null;
};

export default HealthCheck;
