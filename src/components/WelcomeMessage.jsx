const WelcomeMessage = () => (
  <div className="text-center py-8 sm:py-16 px-4">
    <div className="mb-4 sm:mb-6">
      <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
    </div>
    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2 sm:mb-3">
      Ready to analyze a developer profile?
    </h3>
    <p className="text-gray-600 text-sm leading-relaxed max-w-sm sm:max-w-md mx-auto px-2">
      Enter a GitHub profile URL above to get an AI-powered analysis of coding skills, 
      patterns, and areas for growth.
    </p>
  </div>
);

export default WelcomeMessage;