const ResultsCard = ({ results }) => {
  const getGradeColor = (grade) => {
    switch (grade) {
      case 'Beginner': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'Intermediate': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'Advanced': return 'text-green-700 bg-green-50 border-green-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Grade Header */}
      <div className="text-center py-8">
        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getGradeColor(results.grade)}`}>
          {results.grade}
        </div>
        <p className="text-gray-600 text-sm mt-4 max-w-lg mx-auto leading-relaxed">
          {results.reasoning}
        </p>
        <p className="text-xs text-gray-400 mt-3">
          Based on {results.analyzedRepos} of {results.totalRepos} repositories
        </p>
      </div>

      {/* Strengths */}
      <div className="border-l-2 border-green-200 pl-4">
        <h3 className="text-sm font-medium text-green-800 mb-3">Strengths</h3>
        <ul className="space-y-2">
          {results.strengths.map((strength, index) => (
            <li key={index} className="text-sm text-gray-700 leading-relaxed">
              {strength}
            </li>
          ))}
        </ul>
      </div>

      {/* Areas for Improvement */}
      <div className="border-l-2 border-orange-200 pl-4">
        <h3 className="text-sm font-medium text-orange-800 mb-3">Areas for Improvement</h3>
        <ul className="space-y-2">
          {results.weaknesses.map((weakness, index) => (
            <li key={index} className="text-sm text-gray-700 leading-relaxed">
              {weakness}
            </li>
          ))}
        </ul>
      </div>

      {/* Suggestions */}
      <div className="border-l-2 border-blue-200 pl-4">
        <h3 className="text-sm font-medium text-blue-800 mb-3">Suggestions</h3>
        <ul className="space-y-2">
          {results.suggestions.map((suggestion, index) => (
            <li key={index} className="text-sm text-gray-700 leading-relaxed">
              {suggestion}
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-center pt-6">
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
        >
          Analyze Another
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
          className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default ResultsCard;