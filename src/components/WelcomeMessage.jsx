const WelcomeMessage = () => (
  <div className="text-center py-16">
    <div className="mb-6">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl mb-4">
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-3">
      Ready to analyze a developer profile?
    </h3>
    <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
      Enter a GitHub profile URL above to get an AI-powered analysis of coding skills, 
      patterns, and areas for growth.
    </p>
  </div>
);

export default WelcomeMessage;