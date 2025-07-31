import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Github, Code, GitCommit, Star, GitFork, Languages, TrendingUp, Calendar, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const { toast } = useToast();

  const analyzeRepository = async () => {
    if (!repoUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a GitHub repository URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Extract owner/repo from URL
      const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (!match) {
        throw new Error("Invalid GitHub URL format");
      }

      const [, owner, repo] = match;
      
      // Fetch repository data
      const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
      if (!repoResponse.ok) {
        throw new Error("Repository not found");
      }
      
      const repoData = await repoResponse.json();
      
      // Fetch commits
      const commitsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=10`);
      const commitsData = await commitsResponse.json();
      
      // Fetch languages
      const languagesResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`);
      const languagesData = await languagesResponse.json();

      setAnalysis({
        repo: repoData,
        commits: commitsData,
        languages: languagesData,
      });

      toast({
        title: "Analysis Complete",
        description: "Repository has been analyzed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to analyze repository",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getSkillLevel = (stars, commits, languages) => {
    const langCount = Object.keys(languages).length;
    const score = (stars * 0.3) + (commits.length * 0.4) + (langCount * 0.3);
    
    if (score >= 20) return { level: "Senior", color: "gradient-primary", gradient: true };
    if (score >= 10) return { level: "Mid-level", color: "bg-yellow-500", gradient: false };
    return { level: "Junior", color: "bg-blue-500", gradient: false };
  };

  return (
    <div className="min-h-screen p-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative">
        {/* Header */}
        <div className="text-center space-y-6 py-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card mb-4">
            <Code className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">AI-Powered Developer Insights</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Developer Evaluator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Analyze GitHub repositories to evaluate developer skills and get AI-powered insights
          </p>
        </div>

        {/* Input Form */}
        <Card className="w-full max-w-3xl mx-auto glass-card border-primary/20 glow-soft">
          <CardContent className="pt-8 pb-8">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Enter GitHub repository URL (e.g., https://github.com/user/repo)"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  disabled={loading}
                  className="pl-12 h-12 bg-muted/50 border-primary/20 focus:border-primary/40 text-base"
                />
              </div>
              <Button 
                onClick={analyzeRepository} 
                disabled={loading}
                className="h-12 px-8 gradient-primary hover:opacity-90 transition-all duration-300 glow-primary"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Analyze
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysis && (
          <div className="grid gap-8 animate-fade-in">
            {/* Repository Overview */}
            <Card className="glass-card border-primary/20 glow-soft">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-lg gradient-primary">
                    <Github className="h-5 w-5 text-white" />
                  </div>
                  Repository Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 gradient-secondary rounded-xl border border-primary/20">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Star className="h-5 w-5 text-yellow-400" />
                      <div className="text-3xl font-bold text-primary">{analysis.repo.stargazers_count}</div>
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">Stars</div>
                  </div>
                  <div className="text-center p-6 gradient-secondary rounded-xl border border-primary/20">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <GitFork className="h-5 w-5 text-blue-400" />
                      <div className="text-3xl font-bold text-primary">{analysis.repo.forks_count}</div>
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">Forks</div>
                  </div>
                  <div className="text-center p-6 gradient-secondary rounded-xl border border-primary/20">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Languages className="h-5 w-5 text-green-400" />
                      <div className="text-3xl font-bold text-primary">{Object.keys(analysis.languages).length}</div>
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">Languages</div>
                  </div>
                </div>
                
                <div className="p-6 gradient-secondary rounded-xl border border-primary/20">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Code className="h-4 w-4 text-primary" />
                    Description
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {analysis.repo.description || "No description available"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Skill Assessment */}
            <Card className="glass-card border-primary/20 glow-soft">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-lg gradient-primary">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  Developer Skill Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4 p-6 gradient-secondary rounded-xl border border-primary/20">
                  <Badge 
                    className={`px-4 py-2 text-sm font-medium ${
                      getSkillLevel(analysis.repo.stargazers_count, analysis.commits, analysis.languages).gradient 
                        ? 'gradient-primary text-white border-0' 
                        : `${getSkillLevel(analysis.repo.stargazers_count, analysis.commits, analysis.languages).color} text-white`
                    }`}
                  >
                    {getSkillLevel(analysis.repo.stargazers_count, analysis.commits, analysis.languages).level}
                  </Badge>
                  <div>
                    <p className="font-medium">Skill Level Assessment</p>
                    <p className="text-sm text-muted-foreground">
                      Based on repository metrics and activity patterns
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Languages className="h-4 w-4 text-primary" />
                    Technologies & Languages
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {Object.keys(analysis.languages).map((lang) => (
                      <Badge 
                        key={lang} 
                        variant="outline" 
                        className="px-3 py-1 border-primary/30 hover:border-primary/50 transition-colors"
                      >
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Commits */}
            <Card className="glass-card border-primary/20 glow-soft">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-lg gradient-primary">
                    <GitCommit className="h-5 w-5 text-white" />
                  </div>
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.commits.slice(0, 5).map((commit, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 gradient-secondary rounded-xl border border-primary/20 hover:border-primary/30 transition-colors">
                      <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0 glow-primary" />
                      <div className="flex-1 space-y-1">
                        <p className="font-medium leading-relaxed">{commit.commit.message.split('\n')[0]}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {commit.commit.author.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(commit.commit.author.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
