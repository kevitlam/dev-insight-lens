const ResultsCard = ({ results }) => {
  const getGradeColor = (grade) => {
    switch (grade) {
      case 'Beginner': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Intermediate': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Advanced': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getGradeEmoji = (grade) => {
    switch (grade) {
      case 'Beginner': return '🌱';
      case 'Intermediate': return '🚀';
      case 'Advanced': return '⭐';
      default: return '📊';
    }
  };

  return (
    <div className="space-y-6">
      {/* Grade Header */}
      <div className="bg-background rounded-lg shadow-sm border p-6 text-center">
        <div className="mb-4">
          <span className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold border ${getGradeColor(results.grade)}`}>
            {getGradeEmoji(results.grade)} {results.grade} Developer
          </span>
        </div>
        <p className="text-muted-foreground mb-4">{results.reasoning}</p>
        <div className="text-sm text-muted-foreground">
          Based on analysis of {results.analyzedRepos} out of {results.totalRepos} repositories
        </div>
      </div>

      {/* Strengths */}
      <div className="bg-background rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-4">✅ Strengths</h3>
        <ul className="space-y-2">
          {results.strengths.map((strength, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span className="text-foreground">{strength}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Weaknesses */}
      <div className="bg-background rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-orange-800 mb-4">⚠️ Areas for Improvement</h3>
        <ul className="space-y-2">
          {results.weaknesses.map((weakness, index) => (
            <li key={index} className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span className="text-foreground">{weakness}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Suggestions */}
      <div className="bg-background rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">💡 Suggestions</h3>
        <ul className="space-y-2">
          {results.suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span className="text-foreground">{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
        >
          Analyze Another Profile
        </button>
        <button 
          onClick={() => {
            const shareText = `I got ${results.grade} level on AI Developer Evaluator!`;
            if (navigator.share) {
              navigator.share({ text: shareText });
            } else {
              navigator.clipboard.writeText(shareText);
              alert('Results copied to clipboard!');
            }
          }}
          className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80"
        >
          Share Results
        </button>
      </div>
    </div>
  );
};

export default ResultsCard;