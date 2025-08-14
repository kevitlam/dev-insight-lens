import { useState } from 'react';
import { analyzeGitHubProfile } from '../services/api';
import GitHubInput from '../components/GitHubInput';
import LoadingState from '../components/LoadingState';
import ResultsCard from '../components/ResultsCard';
import ErrorMessage from '../components/ErrorMessage';
import WelcomeMessage from '../components/WelcomeMessage';

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
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground">
            🎯 AI Developer Evaluator
          </h1>
          <p className="text-muted-foreground mt-2">
            Paste any GitHub profile URL and get an instant AI-powered skill assessment
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
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
