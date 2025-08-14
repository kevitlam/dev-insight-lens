const WelcomeMessage = () => (
  <div className="bg-background rounded-lg shadow-sm border p-6 text-center">
    <div className="text-6xl mb-4">🎯</div>
    <h3 className="text-xl font-semibold text-foreground mb-2">
      Ready to Analyze a Developer?
    </h3>
    <p className="text-muted-foreground mb-4">
      Enter any GitHub profile URL above and our AI will evaluate their coding skills, 
      providing detailed feedback on code quality, best practices, and areas for improvement.
    </p>
    <div className="text-sm text-muted-foreground">
      Try it with popular profiles like octocat, defunkt, or mojombo
    </div>
  </div>
);

export default WelcomeMessage;