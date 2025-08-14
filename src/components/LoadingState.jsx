import { useState, useEffect } from 'react';

const LoadingState = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [dots, setDots] = useState('');

  const steps = [
    { text: 'Connecting to GitHub API...', percentage: 20 },
    { text: 'Fetching repositories...', percentage: 40 },
    { text: 'Analyzing code structure...', percentage: 60 },
    { text: 'AI is evaluating code quality...', percentage: 80 },
    { text: 'Generating detailed report...', percentage: 95 }
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => prev < steps.length - 1 ? prev + 1 : prev);
    }, 4000);

    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => {
      clearInterval(stepInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <div className="bg-background rounded-lg shadow-sm border p-8 text-center">
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <svg className="animate-spin w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
            <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-foreground">
          Analyzing GitHub Profile{dots}
        </h3>
        <p className="text-muted-foreground mt-2">AI is reviewing code quality and best practices</p>
      </div>

      <div className="mb-6">
        <div className="bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-1000"
            style={{ width: `${steps[currentStep].percentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{steps[currentStep].text}</p>
      </div>

      <p className="text-sm text-muted-foreground">This usually takes 15-30 seconds</p>
    </div>
  );
};

export default LoadingState;