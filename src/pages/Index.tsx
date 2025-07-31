import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Github, Code, GitCommit } from "lucide-react";
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
    
    if (score >= 20) return { level: "Senior", color: "bg-green-500" };
    if (score >= 10) return { level: "Mid-level", color: "bg-yellow-500" };
    return { level: "Junior", color: "bg-blue-500" };
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Developer Evaluator</h1>
          <p className="text-muted-foreground">Analyze GitHub repositories to evaluate developer skills</p>
        </div>

        {/* Input Form */}
        <Card className="w-full max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <Input
                placeholder="Enter GitHub repository URL (e.g., https://github.com/user/repo)"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                disabled={loading}
              />
              <Button onClick={analyzeRepository} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Github className="h-4 w-4" />}
                Analyze
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysis && (
          <div className="grid gap-6">
            {/* Repository Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Github className="h-5 w-5" />
                  Repository Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">{analysis.repo.stargazers_count}</div>
                    <div className="text-sm text-muted-foreground">Stars</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">{analysis.repo.forks_count}</div>
                    <div className="text-sm text-muted-foreground">Forks</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">{Object.keys(analysis.languages).length}</div>
                    <div className="text-sm text-muted-foreground">Languages</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-muted-foreground">{analysis.repo.description || "No description available"}</p>
                </div>
              </CardContent>
            </Card>

            {/* Skill Assessment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Developer Skill Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <Badge className={`${getSkillLevel(analysis.repo.stargazers_count, analysis.commits, analysis.languages).color} text-white`}>
                    {getSkillLevel(analysis.repo.stargazers_count, analysis.commits, analysis.languages).level}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Based on repository metrics and activity
                  </span>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Languages Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(analysis.languages).map((lang) => (
                      <Badge key={lang} variant="outline">{lang}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Commits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitCommit className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysis.commits.slice(0, 5).map((commit, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{commit.commit.message.split('\n')[0]}</p>
                        <p className="text-xs text-muted-foreground">
                          by {commit.commit.author.name} • {new Date(commit.commit.author.date).toLocaleDateString()}
                        </p>
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
