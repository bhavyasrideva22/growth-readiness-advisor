import { AssessmentResult } from '@/types/assessment';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, XCircle, BarChart, Brain, Target } from 'lucide-react';

interface ResultsPageProps {
  result: AssessmentResult;
  onRestart: () => void;
}

export const ResultsPage = ({ result, onRestart }: ResultsPageProps) => {
  const getRecommendationIcon = () => {
    switch (result.recommendation) {
      case 'yes': return <CheckCircle className="w-12 h-12 text-success" />;
      case 'maybe': return <AlertCircle className="w-12 h-12 text-warning" />;
      case 'no': return <XCircle className="w-12 h-12 text-destructive" />;
    }
  };

  const getRecommendationColor = () => {
    switch (result.recommendation) {
      case 'yes': return 'success';
      case 'maybe': return 'warning';
      case 'no': return 'destructive';
    }
  };

  const getRecommendationText = () => {
    switch (result.recommendation) {
      case 'yes': return 'Yes, Lifecycle & Growth Management is a great fit for you!';
      case 'maybe': return 'Maybe - You have potential but need some development';
      case 'no': return 'Consider alternative career paths that better match your profile';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Your Assessment Results
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive evaluation of your fit for Lifecycle & Growth Management
          </p>
        </div>

        {/* Main Recommendation */}
        <Card className="shadow-strong animate-fade-in" style={{animationDelay: '0.2s'}}>
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              {getRecommendationIcon()}
            </div>
            <CardTitle className="text-2xl font-bold">
              {getRecommendationText()}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Overall Readiness Score</span>
              <Badge variant={getRecommendationColor()} className="text-lg px-4 py-2">
                {result.overallScore}/100
              </Badge>
            </div>
            
            <Progress value={result.overallScore} className="h-4" />
            
            <div className="text-center">
              <span className="text-sm text-muted-foreground">
                Confidence Level: {result.confidence}%
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Scores */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Psychometric Score */}
          <Card className="shadow-medium animate-fade-in" style={{animationDelay: '0.4s'}}>
            <CardHeader className="flex flex-row items-center space-y-0 pb-3">
              <Brain className="w-6 h-6 text-primary mr-2" />
              <CardTitle className="text-lg">Psychological Fit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Score</span>
                  <span className="font-bold">{result.psychometricScore}/100</span>
                </div>
                <Progress value={result.psychometricScore} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Technical Score */}
          <Card className="shadow-medium animate-fade-in" style={{animationDelay: '0.5s'}}>
            <CardHeader className="flex flex-row items-center space-y-0 pb-3">
              <BarChart className="w-6 h-6 text-primary mr-2" />
              <CardTitle className="text-lg">Technical Readiness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Score</span>
                  <span className="font-bold">{result.technicalScore}/100</span>
                </div>
                <Progress value={result.technicalScore} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* WISCAR Composite */}
          <Card className="shadow-medium animate-fade-in" style={{animationDelay: '0.6s'}}>
            <CardHeader className="flex flex-row items-center space-y-0 pb-3">
              <Target className="w-6 h-6 text-primary mr-2" />
              <CardTitle className="text-lg">WISCAR Framework</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(result.wiscarScores).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="capitalize">{key}</span>
                    <span className="font-medium">{value}/100</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights */}
        <Card className="shadow-medium animate-fade-in" style={{animationDelay: '0.8s'}}>
          <CardHeader>
            <CardTitle className="text-xl">Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {result.insights.map((insight, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">{insight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Career Paths */}
        <Card className="shadow-medium animate-fade-in" style={{animationDelay: '1.0s'}}>
          <CardHeader>
            <CardTitle className="text-xl">Recommended Career Paths</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {result.careerPaths.map((path, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold">{path.title}</h4>
                    <Badge variant="outline">{path.match}% match</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{path.description}</p>
                  <Progress value={path.match} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="shadow-medium animate-fade-in" style={{animationDelay: '1.2s'}}>
          <CardHeader>
            <CardTitle className="text-xl">Your Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {result.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="text-center space-y-4 animate-fade-in" style={{animationDelay: '1.4s'}}>
          <Button 
            onClick={onRestart}
            variant="gradient"
            size="xl"
          >
            Take Assessment Again
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Want to improve your scores? Focus on the recommended next steps and retake the assessment in 3-6 months.
          </p>
        </div>
      </div>
    </div>
  );
};