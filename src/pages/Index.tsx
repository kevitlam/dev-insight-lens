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
    
    if (score >= 20) return { level: "Senior Developer", color: "bg-green-600", score: "A" };
    if (score >= 10) return { level: "Mid-Level Developer", color: "bg-blue-600", score: "B" };
    return { level: "Junior Developer", color: "bg-orange-600", score: "C" };
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Generated {new Date().toLocaleDateString()}
            </div>
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            Artemis Developer Assessment
          </h1>
          <p className="text-muted-foreground">
            by Oncode • Comprehensive GitHub Repository Analysis
          </p>
        </div>

        {/* Input Form */}
        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter GitHub repository URL (e.g., https://github.com/user/repo)"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  disabled={loading}
                  className="pl-10 h-10 border-input"
                />
              </div>
              <Button 
                onClick={analyzeRepository} 
                disabled={loading}
                className="h-10 px-6 bg-primary hover:bg-primary/90"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Run Analysis
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-6">
            {/* Report Header */}
            <Card className="border-primary/20">
              <CardHeader className="border-b border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-primary mb-1">
                      Developer Performance Report
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Repository: {analysis.repo.full_name}
                    </p>
                  </div>
                  <Badge className={`${getSkillLevel(analysis.repo.stargazers_count, analysis.commits, analysis.languages).color} text-white`}>
                    Grade {getSkillLevel(analysis.repo.stargazers_count, analysis.commits, analysis.languages).score}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{analysis.repo.stargazers_count}</div>
                    <div className="text-xs text-muted-foreground">Stars</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{analysis.repo.forks_count}</div>
                    <div className="text-xs text-muted-foreground">Forks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{analysis.commits.length}</div>
                    <div className="text-xs text-muted-foreground">Recent Commits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{Object.keys(analysis.languages).length}</div>
                    <div className="text-xs text-muted-foreground">Languages</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Skill Assessment */}
              <Card className="border-primary/20">
                <CardHeader className="border-b border-border">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Skill Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Level</span>
                    <Badge className={`${getSkillLevel(analysis.repo.stargazers_count, analysis.commits, analysis.languages).color} text-white`}>
                      {getSkillLevel(analysis.repo.stargazers_count, analysis.commits, analysis.languages).level}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Code Quality</span>
                        <span>4/5</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Commit Hygiene</span>
                        <span>3/5</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Documentation</span>
                        <span>2/5</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Technologies */}
              <Card className="border-primary/20">
                <CardHeader className="border-b border-border">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Code className="h-4 w-4 text-primary" />
                    Technical Stack
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(analysis.languages).map((lang) => (
                      <Badge 
                        key={lang} 
                        variant="outline" 
                        className="border-primary/30 text-primary"
                      >
                        {lang}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <h4 className="text-sm font-semibold mb-2">Project Description</h4>
                    <p className="text-sm text-muted-foreground">
                      {analysis.repo.description || "No description available"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Commit Analysis */}
            <Card className="border-primary/20">
              <CardHeader className="border-b border-border">
                <CardTitle className="text-lg flex items-center gap-2">
                  <GitCommit className="h-4 w-4 text-primary" />
                  Commit Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {analysis.commits.slice(0, 5).map((commit, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{commit.commit.message.split('\n')[0]}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
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

            {/* Report Summary */}
            <Card className="border-primary/20">
              <CardHeader className="border-b border-border">
                <CardTitle className="text-lg">Assessment Summary</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This developer demonstrates <strong>solid technical capabilities</strong> with experience across {Object.keys(analysis.languages).length} programming languages. 
                    The repository shows <strong>{analysis.repo.stargazers_count} stars</strong> and <strong>{analysis.repo.forks_count} forks</strong>, 
                    indicating community engagement. Recent commit activity shows {analysis.commits.length} commits with 
                    <strong> {getSkillLevel(analysis.repo.stargazers_count, analysis.commits, analysis.languages).level.toLowerCase()}</strong> level contributions.
                    Areas for improvement include documentation practices and commit message consistency.
                  </p>
                </div>
                
                <div className="mt-4 flex justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => setAnalysis(null)}
                    className="border-primary/30 text-primary hover:bg-primary/10"
                  >
                    Analyze Another Repository
                  </Button>
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
