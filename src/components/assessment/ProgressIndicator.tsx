import { Progress } from "@/components/ui/progress";

interface ProgressIndicatorProps {
  currentQuestion: number;
  totalQuestions: number;
  currentSection: string;
}

export const ProgressIndicator = ({ 
  currentQuestion, 
  totalQuestions, 
  currentSection 
}: ProgressIndicatorProps) => {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-muted-foreground">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span className="text-sm font-medium text-primary capitalize">
          {currentSection} Section
        </span>
      </div>
      
      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <div className="text-xs text-muted-foreground text-center">
          {Math.round(progress)}% Complete
        </div>
      </div>
    </div>
  );
};