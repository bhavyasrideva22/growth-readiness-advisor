import { Question } from '@/types/assessment';

export const assessmentQuestions: Question[] = [
  // Psychometric Section - Interest & Personality
  {
    id: 'psych_1',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest',
    question: 'I enjoy analyzing user behavior patterns and finding optimization opportunities.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'psych_2',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality',
    question: 'I am comfortable making decisions with incomplete information.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'psych_3',
    type: 'situational',
    category: 'psychometric',
    subcategory: 'problem-solving',
    question: 'Your app\'s user retention dropped by 15% last month. What would be your first approach?',
    options: [
      'Immediately run user surveys to understand why people are leaving',
      'Analyze user behavior data to identify drop-off points',
      'A/B test different onboarding flows',
      'Review competitor strategies for retention'
    ]
  },
  {
    id: 'psych_4',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'motivation',
    question: 'I persist through challenges even when progress is slow.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'psych_5',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'curiosity',
    question: 'I actively seek to understand why certain marketing campaigns perform better than others.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },

  // Technical Aptitude Section
  {
    id: 'tech_1',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'metrics',
    question: 'What does LTV (Customer Lifetime Value) measure?',
    options: [
      'The total revenue a customer generates during their relationship with your company',
      'The cost to acquire a new customer',
      'The percentage of customers who continue using your product',
      'The time it takes for a customer to make their first purchase'
    ]
  },
  {
    id: 'tech_2',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'analytics',
    question: 'In A/B testing, what is statistical significance?',
    options: [
      'When the difference between variants is unlikely due to chance',
      'When you have enough users in your test',
      'When the test has been running for at least a week',
      'When both variants perform better than the control'
    ]
  },
  {
    id: 'tech_3',
    type: 'situational',
    category: 'technical',
    subcategory: 'funnel-analysis',
    question: 'You notice a 30% drop-off between sign-up and first purchase. Which metric would help you understand this best?',
    options: [
      'Time between sign-up and first purchase attempt',
      'Number of product page views before purchase',
      'Customer acquisition cost',
      'Overall conversion rate'
    ]
  },
  {
    id: 'tech_4',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'tools',
    question: 'Which tool would you primarily use to track user behavior flows?',
    options: [
      'Google Analytics',
      'Mixpanel or Amplitude',
      'Excel spreadsheets',
      'Customer surveys'
    ]
  },
  {
    id: 'tech_5',
    type: 'likert',
    category: 'technical',
    subcategory: 'data-comfort',
    question: 'I am comfortable working with SQL queries and data analysis.',
    scale: { min: 1, max: 5, labels: ['Not at all', 'Slightly', 'Moderately', 'Very', 'Extremely'] }
  },

  // WISCAR Framework Section
  {
    id: 'wiscar_w1',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'will',
    question: 'I finish whatever I begin, even when it becomes challenging.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'wiscar_i1',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'interest',
    question: 'I find user psychology and behavior fascinating.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'wiscar_s1',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'skill',
    question: 'I have experience with marketing analytics tools (Google Analytics, Facebook Ads, etc.).',
    scale: { min: 1, max: 5, labels: ['No experience', 'Basic', 'Intermediate', 'Advanced', 'Expert'] }
  },
  {
    id: 'wiscar_c1',
    type: 'situational',
    category: 'wiscar',
    subcategory: 'cognitive',
    question: 'If Pattern A = 2, 4, 8, 16 and Pattern B = 3, 6, 12, 24, what comes next in Pattern C = 5, 10, 20, ?',
    options: ['25', '30', '40', '50']
  },
  {
    id: 'wiscar_a1',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'ability',
    question: 'I believe I can master new skills through effort and practice.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  },
  {
    id: 'wiscar_r1',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'realWorld',
    question: 'A career in Lifecycle & Growth Management aligns with my professional goals.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] }
  }
];

export const sectionInfo = {
  psychometric: {
    title: 'Psychological Fit Assessment',
    description: 'Evaluating your personality traits and interests for growth management',
    icon: '🧠'
  },
  technical: {
    title: 'Technical Readiness Evaluation',
    description: 'Testing your knowledge of growth metrics and analytical thinking',
    icon: '📊'
  },
  wiscar: {
    title: 'WISCAR Framework Analysis',
    description: 'Comprehensive evaluation across six key dimensions',
    icon: '🎯'
  }
};