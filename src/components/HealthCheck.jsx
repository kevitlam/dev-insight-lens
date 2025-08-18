import { useState, useEffect } from 'react';
import { checkBackendHealth } from '../services/api';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

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
    
    // Check health every 5 minutes
    const interval = setInterval(fetchHealth, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
        Checking backend status...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <Badge variant="destructive">Backend Offline</Badge>
        <span className="text-muted-foreground">{error}</span>
      </div>
    );
  }

  if (healthStatus) {
    return (
      <div className="flex items-center gap-3 text-sm">
        <Badge variant="success" className="bg-green-100 text-green-800 border-green-200">
          Backend Online
        </Badge>
        <Separator orientation="vertical" className="h-4" />
        <span className="text-muted-foreground">
          Service: {healthStatus.service || 'API'}
        </span>
        <Separator orientation="vertical" className="h-4" />
        <span className="text-muted-foreground">
          Last Check: {new Date(healthStatus.timestamp).toLocaleTimeString()}
        </span>
      </div>
    );
  }

  return null;
};

export default HealthCheck;
