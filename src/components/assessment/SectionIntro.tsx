import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { sectionInfo } from '@/data/questions';

interface SectionIntroProps {
  section: keyof typeof sectionInfo;
  onStart: () => void;
}

export const SectionIntro = ({ section, onStart }: SectionIntroProps) => {
  const info = sectionInfo[section];

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-medium animate-fade-in">
      <CardHeader className="text-center pb-6">
        <div className="text-6xl mb-4">{info.icon}</div>
        <CardTitle className="text-2xl font-bold">{info.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6 text-center">
        <p className="text-lg text-muted-foreground leading-relaxed">
          {info.description}
        </p>
        
        <div className="bg-muted/50 rounded-lg p-6 space-y-3">
          <h4 className="font-semibold">What to expect:</h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            {section === 'psychometric' && (
              <>
                <li>• Personality and interest assessment</li>
                <li>• Situational judgment scenarios</li>
                <li>• Motivation and curiosity evaluation</li>
              </>
            )}
            {section === 'technical' && (
              <>
                <li>• Growth metrics knowledge</li>
                <li>• Analytics and A/B testing concepts</li>
                <li>• Tool familiarity assessment</li>
              </>
            )}
            {section === 'wiscar' && (
              <>
                <li>• Will, Interest, Skill evaluation</li>
                <li>• Cognitive readiness testing</li>
                <li>• Career alignment assessment</li>
              </>
            )}
          </ul>
        </div>
        
        <Button 
          onClick={onStart}
          variant="gradient"
          size="xl"
          className="mt-8"
        >
          Start {info.title}
        </Button>
      </CardContent>
    </Card>
  );
};