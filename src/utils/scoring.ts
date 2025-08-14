import { Response, AssessmentResult, WiscarScore } from '@/types/assessment';
import { assessmentQuestions } from '@/data/questions';

export const calculateScores = (responses: Response[]): AssessmentResult => {
  // Create response map for easy lookup
  const responseMap = new Map(responses.map(r => [r.questionId, r.value]));

  // Calculate Psychometric Score
  const psychometricQuestions = assessmentQuestions.filter(q => q.category === 'psychometric');
  const psychometricScore = calculateSectionScore(psychometricQuestions, responseMap);

  // Calculate Technical Score
  const technicalQuestions = assessmentQuestions.filter(q => q.category === 'technical');
  const technicalScore = calculateSectionScore(technicalQuestions, responseMap);

  // Calculate WISCAR Scores
  const wiscarScores = calculateWiscarScores(responseMap);

  // Calculate Overall Score
  const overallScore = Math.round(
    (psychometricScore * 0.3) + 
    (technicalScore * 0.3) + 
    (getWiscarComposite(wiscarScores) * 0.4)
  );

  // Generate Recommendation
  const recommendation = getRecommendation(psychometricScore, technicalScore, overallScore);
  
  // Calculate Confidence
  const confidence = calculateConfidence(psychometricScore, technicalScore, wiscarScores);

  // Generate Insights and Next Steps
  const insights = generateInsights(psychometricScore, technicalScore, wiscarScores, responseMap);
  const nextSteps = generateNextSteps(recommendation, psychometricScore, technicalScore);

  // Generate Career Paths
  const careerPaths = generateCareerPaths(overallScore, wiscarScores);

  return {
    psychometricScore,
    technicalScore,
    wiscarScores,
    overallScore,
    recommendation,
    confidence,
    insights,
    nextSteps,
    careerPaths
  };
};

const calculateSectionScore = (questions: any[], responseMap: Map<string, any>): number => {
  let totalScore = 0;
  let maxPossibleScore = 0;

  questions.forEach(question => {
    const response = responseMap.get(question.id);
    if (response !== undefined) {
      if (question.type === 'likert') {
        totalScore += Number(response);
        maxPossibleScore += 5;
      } else if (question.type === 'multiple-choice' || question.type === 'situational') {
        // Award points based on correct answers (simplified scoring)
        const correctAnswers: { [key: string]: number } = {
          'tech_1': 0, // LTV definition
          'tech_2': 0, // Statistical significance
          'tech_3': 0, // Funnel analysis
          'tech_4': 1, // Analytics tools
          'wiscar_c1': 2 // Pattern recognition (40)
        };
        
        if (correctAnswers[question.id] !== undefined && Number(response) === correctAnswers[question.id]) {
          totalScore += 5;
        }
        maxPossibleScore += 5;
      }
    }
  });

  return maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;
};

const calculateWiscarScores = (responseMap: Map<string, any>): WiscarScore => {
  const wiscarCategories = {
    will: ['wiscar_w1'],
    interest: ['wiscar_i1'],
    skill: ['wiscar_s1'],
    cognitive: ['wiscar_c1'],
    ability: ['wiscar_a1'],
    realWorld: ['wiscar_r1']
  };

  const scores: WiscarScore = {
    will: 0,
    interest: 0,
    skill: 0,
    cognitive: 0,
    ability: 0,
    realWorld: 0
  };

  Object.entries(wiscarCategories).forEach(([category, questionIds]) => {
    let categoryScore = 0;
    questionIds.forEach(qId => {
      const response = responseMap.get(qId);
      if (response !== undefined) {
        if (qId === 'wiscar_c1') {
          // Cognitive question - pattern recognition
          categoryScore = Number(response) === 2 ? 100 : 20; // Correct answer gets 100, wrong gets 20
        } else {
          categoryScore = (Number(response) / 5) * 100;
        }
      }
    });
    scores[category as keyof WiscarScore] = Math.round(categoryScore);
  });

  return scores;
};

const getWiscarComposite = (wiscarScores: WiscarScore): number => {
  const values = Object.values(wiscarScores);
  return Math.round(values.reduce((sum, val) => sum + val, 0) / values.length);
};

const getRecommendation = (psychometric: number, technical: number, overall: number): 'yes' | 'maybe' | 'no' => {
  if (overall >= 75 && psychometric >= 70 && technical >= 60) return 'yes';
  if (overall >= 60 || (psychometric >= 70 && technical >= 40)) return 'maybe';
  return 'no';
};

const calculateConfidence = (psychometric: number, technical: number, wiscarScores: WiscarScore): number => {
  const variance = Math.abs(psychometric - technical);
  const wiscarVariance = Math.max(...Object.values(wiscarScores)) - Math.min(...Object.values(wiscarScores));
  
  let confidence = 85;
  if (variance > 30) confidence -= 15;
  if (wiscarVariance > 40) confidence -= 10;
  
  return Math.max(60, confidence);
};

const generateInsights = (psychometric: number, technical: number, wiscarScores: WiscarScore, responseMap: Map<string, any>): string[] => {
  const insights: string[] = [];

  if (psychometric >= 80) {
    insights.push("You show strong psychological alignment with growth management roles.");
  } else if (psychometric >= 60) {
    insights.push("You have moderate personality fit but may need to develop growth mindset.");
  } else {
    insights.push("Consider whether the analytical and experimental nature of growth work matches your interests.");
  }

  if (technical >= 80) {
    insights.push("Your technical knowledge is strong - you're ready for advanced growth topics.");
  } else if (technical >= 60) {
    insights.push("You have solid foundations but need to strengthen your analytics skills.");
  } else {
    insights.push("Focus on building fundamental knowledge in growth metrics and analytics tools.");
  }

  if (wiscarScores.skill < 60) {
    insights.push("Gaining hands-on experience with analytics tools will significantly boost your readiness.");
  }

  if (wiscarScores.will >= 80 && wiscarScores.realWorld >= 80) {
    insights.push("Your motivation and career alignment are excellent - persistence will be key to success.");
  }

  return insights;
};

const generateNextSteps = (recommendation: string, psychometric: number, technical: number): string[] => {
  const steps: string[] = [];

  if (recommendation === 'yes') {
    steps.push("Start with foundational courses in growth marketing and analytics");
    steps.push("Practice with tools like Google Analytics and basic SQL");
    steps.push("Build a portfolio of growth experiments and case studies");
    steps.push("Network with growth professionals and join communities");
  } else if (recommendation === 'maybe') {
    if (technical < 60) {
      steps.push("Strengthen your technical foundation with analytics courses");
      steps.push("Complete hands-on projects with data analysis tools");
    }
    if (psychometric < 70) {
      steps.push("Explore growth case studies to build interest and understanding");
      steps.push("Consider shadowing a growth professional or taking an internship");
    }
    steps.push("Reassess after 3-6 months of focused learning");
  } else {
    steps.push("Explore adjacent roles like Product Marketing or Customer Success");
    steps.push("Consider your core interests and alternative career paths");
    steps.push("If still interested, start with basic marketing and analytics courses");
  }

  return steps;
};

const generateCareerPaths = (overallScore: number, wiscarScores: WiscarScore): Array<{ title: string; description: string; match: number }> => {
  const paths = [
    {
      title: "Growth Product Manager",
      description: "Drive user growth through product experiments and data analysis",
      baseMatch: 85
    },
    {
      title: "Lifecycle Marketing Manager",
      description: "Optimize user journeys and messaging across all touchpoints",
      baseMatch: 80
    },
    {
      title: "User Acquisition Lead",
      description: "Manage paid and organic channels to drive sustainable growth",
      baseMatch: 75
    },
    {
      title: "Retention Analyst",
      description: "Reduce churn through behavioral insights and interventions",
      baseMatch: 70
    },
    {
      title: "Growth Engineer",
      description: "Build technical solutions to scale growth operations",
      baseMatch: 65
    }
  ];

  return paths.map(path => ({
    ...path,
    match: Math.min(95, Math.round(path.baseMatch * (overallScore / 100)))
  })).sort((a, b) => b.match - a.match);
};