import { useState } from 'react';
import { analyzeGitHubProfile } from '../services/api';
import GitHubInput from '../components/GitHubInput';
import LoadingState from '../components/LoadingState';
import ResultsCard from '../components/ResultsCard';
import ErrorMessage from '../components/ErrorMessage';
import WelcomeMessage from '../components/WelcomeMessage';
import HealthCheck from '../components/HealthCheck';

const Index = () => {
  const [appState, setAppState] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [githubUrl, setGithubUrl] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (url) => {
    setAppState('loading');
    setError(null);
    setResults(null);

    try {
      const response = await analyzeGitHubProfile(url);
      setResults(response.data);
      setAppState('success');
    } catch (err) {
      setError(err.message);
      setAppState('error');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-medium text-gray-900 mb-3">
            oncode developer analysis
          </h1>
          <p className="text-gray-600 text-sm">
            Analyze GitHub profiles with AI
          </p>
          <div className="mt-4 flex justify-center">
            <HealthCheck />
          </div>
        </div>

        <GitHubInput 
          value={githubUrl}
          onChange={setGithubUrl}
          onAnalyze={handleAnalyze}
          disabled={appState === 'loading'}
        />

        <div className="mt-8">
          {appState === 'idle' && <WelcomeMessage />}
          {appState === 'loading' && <LoadingState />}
          {appState === 'success' && <ResultsCard results={results} />}
          {appState === 'error' && <ErrorMessage error={error} onRetry={() => setAppState('idle')} />}
        </div>
      </main>
    </div>
  );
};

export default Index;
