import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  BarChart, 
  Target, 
  TrendingUp, 
  Users, 
  Zap,
  CheckCircle,
  Clock,
  Award
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate("/assessment");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center space-y-8 animate-fade-in">
            
            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">
              AI-Powered Career Assessment
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-hero bg-clip-text text-transparent leading-tight">
              Should I Learn<br />
              <span className="text-primary">Lifecycle & Growth</span><br />
              Management?
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover if you're ready for a career in growth management through our comprehensive 
              assessment that evaluates your personality, skills, and career fit.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleStartAssessment}
                variant="hero"
                size="xl"
                className="min-w-64"
              >
                Start Your Assessment
                <Zap className="w-5 h-5 ml-2" />
              </Button>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-2" />
                Takes 25-30 minutes
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Discover */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">What You'll Discover</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive assessment evaluates multiple dimensions to give you actionable insights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            <Card className="shadow-medium hover:shadow-strong transition-all duration-300 animate-fade-in border-0 bg-gradient-card">
              <CardHeader className="text-center pb-4">
                <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">Psychological Fit</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <p className="text-muted-foreground">
                  Assess your personality traits, motivation, and natural inclinations for growth work
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-success mr-2" />
                    Curiosity & experimentation mindset
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-success mr-2" />
                    Comfort with data-driven decisions
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-success mr-2" />
                    Resilience and persistence
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium hover:shadow-strong transition-all duration-300 animate-fade-in border-0 bg-gradient-card" style={{animationDelay: '0.2s'}}>
              <CardHeader className="text-center pb-4">
                <BarChart className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">Technical Readiness</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <p className="text-muted-foreground">
                  Evaluate your current knowledge of growth metrics, analytics, and tools
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-success mr-2" />
                    Growth metrics (LTV, CAC, Retention)
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-success mr-2" />
                    A/B testing and analytics
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-success mr-2" />
                    Tool familiarity and data comfort
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium hover:shadow-strong transition-all duration-300 animate-fade-in border-0 bg-gradient-card" style={{animationDelay: '0.4s'}}>
              <CardHeader className="text-center pb-4">
                <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">WISCAR Framework</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <p className="text-muted-foreground">
                  Comprehensive evaluation across six key success dimensions
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-success mr-2" />
                    Will, Interest, Skill assessment
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-success mr-2" />
                    Cognitive readiness testing
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-success mr-2" />
                    Real-world career alignment
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Career Paths */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Potential Career Paths</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover which growth management roles align with your profile
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Growth Product Manager",
                description: "Drive user growth through product experiments and data analysis",
                icon: TrendingUp,
                skills: ["Product Strategy", "Data Analysis", "A/B Testing"]
              },
              {
                title: "Lifecycle Marketing Manager", 
                description: "Optimize user journeys and messaging across all touchpoints",
                icon: Users,
                skills: ["Email Marketing", "User Segmentation", "CRM Tools"]
              },
              {
                title: "User Acquisition Lead",
                description: "Manage paid and organic channels to drive sustainable growth",
                icon: Target,
                skills: ["Paid Advertising", "SEO", "Channel Optimization"]
              }
            ].map((path, index) => (
              <Card key={index} className="shadow-soft hover:shadow-medium transition-all duration-300 border-0 bg-card">
                <CardHeader className="pb-4">
                  <path.icon className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-lg">{path.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {path.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {path.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto shadow-strong border-0 bg-gradient-card">
            <CardContent className="text-center space-y-8 py-16">
              <Award className="w-16 h-16 text-primary mx-auto" />
              
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Ready to Discover Your Growth Potential?
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Get personalized insights, career recommendations, and a clear learning roadmap 
                  tailored to your unique profile.
                </p>
              </div>
              
              <div className="space-y-4">
                <Button 
                  onClick={handleStartAssessment}
                  variant="hero" 
                  size="xl"
                  className="min-w-72"
                >
                  Start Your Assessment Now
                  <Zap className="w-5 h-5 ml-2" />
                </Button>
                
                <p className="text-sm text-muted-foreground">
                  Free assessment • Instant results • Personalized recommendations
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
