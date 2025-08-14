const ErrorMessage = ({ error, onRetry }) => (
  <div className="bg-background rounded-lg shadow-sm border border-destructive/20 p-6 text-center">
    <div className="text-destructive text-4xl mb-4">⚠️</div>
    <h3 className="text-lg font-semibold text-destructive mb-2">Analysis Failed</h3>
    <p className="text-destructive/80 mb-4">{error}</p>
    <button 
      onClick={onRetry}
      className="px-6 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90"
    >
      Try Again
    </button>
  </div>
);

export default ErrorMessage;