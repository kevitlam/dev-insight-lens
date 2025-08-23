const ResultsCard = ({ results }) => {
  const getGradeColor = (grade) => {
    switch (grade) {
      case 'Beginner': return {
        bg: 'bg-gradient-to-r from-yellow-50 to-orange-50',
        border: 'border-yellow-200',
        text: 'text-yellow-800',
        badge: 'bg-yellow-100 text-yellow-800 border-yellow-300'
      };
      case 'Intermediate': return {
        bg: 'bg-gradient-to-r from-blue-50 to-indigo-50',
        border: 'border-blue-200',
        text: 'text-blue-800',
        badge: 'bg-blue-100 text-blue-800 border-blue-300'
      };
      case 'Advanced': return {
        bg: 'bg-gradient-to-r from-green-50 to-emerald-50',
        border: 'border-green-200',
        text: 'text-green-800',
        badge: 'bg-green-100 text-green-800 border-green-300'
      };
      default: return {
        bg: 'bg-gradient-to-r from-gray-50 to-slate-50',
        border: 'border-gray-200',
        text: 'text-gray-800',
        badge: 'bg-gray-100 text-gray-800 border-gray-300'
      };
    }
  };

  const gradeColors = getGradeColor(results.grade);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Main Grade Card */}
      <div className={`${gradeColors.bg} ${gradeColors.border} border-2 rounded-2xl p-8 text-center shadow-lg`}>
        <div className="mb-6">
          <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold border-2 ${gradeColors.badge} shadow-sm`}>
            {results.grade} Developer
          </div>
        </div>
        
        <p className={`${gradeColors.text} text-base leading-relaxed max-w-2xl mx-auto mb-4`}>
          {results.reasoning}
        </p>
        
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>{results.analyzedRepos} repositories analyzed</span>
          </div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>{results.totalRepos} total repositories</span>
          </div>
        </div>
      </div>

      {/* Analysis Results Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Strengths */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Strengths</h3>
            </div>
            
            <div className="space-y-3">
              {results.strengths.map((strength, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700 leading-relaxed">{strength}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Areas for Improvement */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Areas to Improve</h3>
            </div>
            
            <div className="space-y-3">
              {results.weaknesses.map((weakness, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700 leading-relaxed">{weakness}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Suggestions</h3>
            </div>
            
            <div className="space-y-3">
              {results.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700 leading-relaxed">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-8">
        <button 
          onClick={() => window.location.reload()}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          <span>Analyze Another Profile</span>
        </button>
        
        <button 
          onClick={() => {
            const shareText = `I got ${results.grade} level on oncode developer analysis! Check out your GitHub profile analysis.`;
            if (navigator.share) {
              navigator.share({ 
                title: 'oncode developer analysis',
                text: shareText,
                url: window.location.href
              });
            } else {
              navigator.clipboard.writeText(shareText);
              alert('Results copied to clipboard!');
            }
          }}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
          </svg>
          <span>Share Results</span>
        </button>
      </div>
    </div>
  );
};

export default ResultsCard;