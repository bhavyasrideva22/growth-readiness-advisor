import { useState } from 'react';
import { Question, Response } from '@/types/assessment';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface QuestionCardProps {
  question: Question;
  onAnswer: (response: Response) => void;
  onNext: () => void;
  canProceed: boolean;
}

export const QuestionCard = ({ question, onAnswer, onNext, canProceed }: QuestionCardProps) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleAnswer = (value: string) => {
    setSelectedValue(value);
    
    let responseValue: number | string = value;
    if (question.type === 'likert') {
      responseValue = parseInt(value);
    }
    
    onAnswer({
      questionId: question.id,
      value: responseValue
    });
  };

  const renderQuestion = () => {
    switch (question.type) {
      case 'likert':
        return (
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">{question.question}</p>
            
            <RadioGroup value={selectedValue} onValueChange={handleAnswer}>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {question.scale?.labels.map((label, index) => {
                  const value = (index + 1).toString();
                  return (
                    <div key={value} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={value} id={value} />
                      <Label htmlFor={value} className="flex-1 text-sm cursor-pointer">
                        <div className="font-medium">{index + 1}</div>
                        <div className="text-xs text-muted-foreground">{label}</div>
                      </Label>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          </div>
        );

      case 'multiple-choice':
      case 'situational':
        return (
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">{question.question}</p>
            
            <RadioGroup value={selectedValue} onValueChange={handleAnswer}>
              <div className="space-y-3">
                {question.options?.map((option, index) => {
                  const value = index.toString();
                  return (
                    <div key={value} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={value} id={value} className="mt-1" />
                      <Label htmlFor={value} className="flex-1 cursor-pointer leading-relaxed">
                        {option}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-medium">
      <CardHeader className="pb-6">
        <CardTitle className="text-xl font-semibold text-center">
          Assessment Question
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {renderQuestion()}
        
        <div className="flex justify-end pt-6 border-t">
          <Button 
            onClick={onNext}
            disabled={!canProceed}
            variant="gradient"
            size="lg"
            className="min-w-32"
          >
            Next Question
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};