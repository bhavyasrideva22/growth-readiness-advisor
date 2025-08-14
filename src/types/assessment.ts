export interface Question {
  id: string;
  type: 'likert' | 'multiple-choice' | 'situational';
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory: string;
  question: string;
  options?: string[];
  scale?: { min: number; max: number; labels: string[] };
}

export interface Response {
  questionId: string;
  value: number | string;
}

export interface SectionScore {
  category: string;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface WiscarScore {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
}

export interface AssessmentResult {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: WiscarScore;
  overallScore: number;
  recommendation: 'yes' | 'maybe' | 'no';
  confidence: number;
  insights: string[];
  nextSteps: string[];
  careerPaths: Array<{
    title: string;
    description: string;
    match: number;
  }>;
}