import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assessmentQuestions } from '@/data/questions';
import { calculateScores } from '@/utils/scoring';
import { Response, AssessmentResult } from '@/types/assessment';
import { ProgressIndicator } from '@/components/assessment/ProgressIndicator';
import { QuestionCard } from '@/components/assessment/QuestionCard';
import { SectionIntro } from '@/components/assessment/SectionIntro';
import { ResultsPage } from '@/components/assessment/ResultsPage';

type AssessmentPhase = 'intro-psychometric' | 'psychometric' | 'intro-technical' | 'technical' | 'intro-wiscar' | 'wiscar' | 'results';

const Assessment = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<AssessmentPhase>('intro-psychometric');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Response[]>([]);
  const [currentResponse, setCurrentResponse] = useState<Response | null>(null);
  const [results, setResults] = useState<AssessmentResult | null>(null);

  // Get questions for current section
  const getCurrentSectionQuestions = () => {
    switch (phase) {
      case 'psychometric':
        return assessmentQuestions.filter(q => q.category === 'psychometric');
      case 'technical':
        return assessmentQuestions.filter(q => q.category === 'technical');
      case 'wiscar':
        return assessmentQuestions.filter(q => q.category === 'wiscar');
      default:
        return [];
    }
  };

  const currentSectionQuestions = getCurrentSectionQuestions();
  const currentQuestion = currentSectionQuestions[currentQuestionIndex];

  const handleAnswer = (response: Response) => {
    setCurrentResponse(response);
  };

  const handleNext = () => {
    if (currentResponse) {
      // Save response
      const newResponses = [...responses.filter(r => r.questionId !== currentResponse.questionId), currentResponse];
      setResponses(newResponses);
      setCurrentResponse(null);

      // Check if section is complete
      if (currentQuestionIndex < currentSectionQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Move to next section
        moveToNextSection();
      }
    }
  };

  const moveToNextSection = () => {
    setCurrentQuestionIndex(0);
    
    switch (phase) {
      case 'psychometric':
        setPhase('intro-technical');
        break;
      case 'technical':
        setPhase('intro-wiscar');
        break;
      case 'wiscar':
        // Calculate results
        const finalResults = calculateScores(responses);
        setResults(finalResults);
        setPhase('results');
        break;
    }
  };

  const startSection = (section: 'psychometric' | 'technical' | 'wiscar') => {
    setPhase(section);
    setCurrentQuestionIndex(0);
  };

  const restartAssessment = () => {
    setPhase('intro-psychometric');
    setCurrentQuestionIndex(0);
    setResponses([]);
    setCurrentResponse(null);
    setResults(null);
  };

  const getTotalProgress = () => {
    const psychometricQuestions = assessmentQuestions.filter(q => q.category === 'psychometric').length;
    const technicalQuestions = assessmentQuestions.filter(q => q.category === 'technical').length;
    const wiscarQuestions = assessmentQuestions.filter(q => q.category === 'wiscar').length;
    const totalQuestions = psychometricQuestions + technicalQuestions + wiscarQuestions;

    let completedQuestions = 0;
    
    if (phase === 'psychometric' || (phase.includes('technical') || phase.includes('wiscar') || phase === 'results')) {
      completedQuestions += psychometricQuestions;
    }
    if (phase === 'technical' || (phase.includes('wiscar') || phase === 'results')) {
      completedQuestions += technicalQuestions;
    }
    if (phase === 'wiscar' || phase === 'results') {
      completedQuestions += wiscarQuestions;
    }
    
    if (phase === 'psychometric') {
      completedQuestions += currentQuestionIndex;
    } else if (phase === 'technical') {
      completedQuestions += currentQuestionIndex;
    } else if (phase === 'wiscar') {
      completedQuestions += currentQuestionIndex;
    }

    return { current: completedQuestions, total: totalQuestions };
  };

  // Show results page
  if (phase === 'results' && results) {
    return <ResultsPage result={results} onRestart={restartAssessment} />;
  }

  // Show section intros
  if (phase === 'intro-psychometric') {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <SectionIntro section="psychometric" onStart={() => startSection('psychometric')} />
      </div>
    );
  }

  if (phase === 'intro-technical') {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <SectionIntro section="technical" onStart={() => startSection('technical')} />
      </div>
    );
  }

  if (phase === 'intro-wiscar') {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <SectionIntro section="wiscar" onStart={() => startSection('wiscar')} />
      </div>
    );
  }

  const progress = getTotalProgress();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto py-8 px-4 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Career Assessment
          </h1>
          <p className="text-muted-foreground">
            Discovering your fit for Lifecycle & Growth Management
          </p>
        </div>

        {/* Progress */}
        <div className="max-w-2xl mx-auto">
          <ProgressIndicator 
            currentQuestion={progress.current + 1}
            totalQuestions={progress.total}
            currentSection={phase}
          />
        </div>

        {/* Question */}
        {currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            onAnswer={handleAnswer}
            onNext={handleNext}
            canProceed={!!currentResponse}
          />
        )}
      </div>
    </div>
  );
};

export default Assessment;