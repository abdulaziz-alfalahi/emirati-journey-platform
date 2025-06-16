
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Check,
  SkipForward,
  RotateCcw
} from 'lucide-react';
import { useTouchInteractions, SwipeDirection } from '@/hooks/use-touch-interactions';

interface MobileSkillAssessmentProps {
  onComplete?: (results: AssessmentResults) => void;
}

interface AssessmentQuestion {
  id: string;
  category: string;
  question: string;
  options: AssessmentOption[];
}

interface AssessmentOption {
  id: string;
  text: string;
  value: number;
}

interface AssessmentResults {
  totalScore: number;
  categoryScores: Record<string, number>;
  completedQuestions: number;
}

export const MobileSkillAssessment: React.FC<MobileSkillAssessmentProps> = ({
  onComplete
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { handleTouchStart, handleTouchEnd, triggerHaptic } = useTouchInteractions();

  // Mock assessment questions
  const questions: AssessmentQuestion[] = [
    {
      id: '1',
      category: 'Technical Skills',
      question: 'How comfortable are you with data analysis and visualization?',
      options: [
        { id: 'a', text: 'Beginner - Limited experience', value: 1 },
        { id: 'b', text: 'Intermediate - Some experience', value: 2 },
        { id: 'c', text: 'Advanced - Very comfortable', value: 3 },
        { id: 'd', text: 'Expert - Can teach others', value: 4 }
      ]
    },
    {
      id: '2',
      category: 'Leadership',
      question: 'How often do you take initiative in team projects?',
      options: [
        { id: 'a', text: 'Rarely - Prefer to follow', value: 1 },
        { id: 'b', text: 'Sometimes - When needed', value: 2 },
        { id: 'c', text: 'Often - Natural tendency', value: 3 },
        { id: 'd', text: 'Always - Born leader', value: 4 }
      ]
    },
    {
      id: '3',
      category: 'Communication',
      question: 'How confident are you presenting to large groups?',
      options: [
        { id: 'a', text: 'Very nervous - Avoid it', value: 1 },
        { id: 'b', text: 'Somewhat nervous - Can do it', value: 2 },
        { id: 'c', text: 'Confident - Enjoy presenting', value: 3 },
        { id: 'd', text: 'Very confident - Love the spotlight', value: 4 }
      ]
    }
  ];

  const handleSwipe = (swipe: SwipeDirection) => {
    if (swipe.direction === 'left' && currentQuestion < questions.length - 1) {
      nextQuestion();
    } else if (swipe.direction === 'right' && currentQuestion > 0) {
      previousQuestion();
    }
  };

  const handleAnswer = (value: number) => {
    triggerHaptic('medium');
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
    
    // Auto advance after a brief delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        nextQuestion();
      } else {
        calculateResults();
      }
    }, 500);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      triggerHaptic('light');
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      triggerHaptic('light');
    }
  };

  const calculateResults = () => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const maxScore = questions.length * 4;
    const percentage = Math.round((totalScore / maxScore) * 100);
    
    const categoryScores: Record<string, number> = {};
    questions.forEach(q => {
      const score = answers[q.id] || 0;
      categoryScores[q.category] = (categoryScores[q.category] || 0) + score;
    });

    const results: AssessmentResults = {
      totalScore: percentage,
      categoryScores,
      completedQuestions: Object.keys(answers).length
    };

    setShowResults(true);
    onComplete?.(results);
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    triggerHaptic('medium');
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];
  const selectedAnswer = answers[question?.id];

  if (showResults) {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const maxScore = questions.length * 4;
    const percentage = Math.round((totalScore / maxScore) * 100);

    return (
      <Card className="mx-4 shadow-lg">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl text-green-600">Assessment Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">{percentage}%</div>
            <p className="text-muted-foreground">Overall Score</p>
          </div>

          <div className="space-y-4">
            {Object.entries(answers).map(([questionId, score]) => {
              const q = questions.find(qu => qu.id === questionId);
              if (!q) return null;
              
              return (
                <div key={questionId} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{q.category}</span>
                    <div className="flex">
                      {[1, 2, 3, 4].map(star => (
                        <Star 
                          key={star}
                          className={`h-4 w-4 ${star <= score ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1 touch-manipulation"
              onClick={resetAssessment}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Retake
            </Button>
            <Button 
              className="flex-1 touch-manipulation"
              onClick={() => onComplete?.({
                totalScore: percentage,
                categoryScores: {},
                completedQuestions: Object.keys(answers).length
              })}
            >
              <Check className="h-4 w-4 mr-2" />
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="px-4 pb-20">
      {/* Progress Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Question {currentQuestion + 1} of {questions.length}</span>
          <Badge variant="outline">{question?.category}</Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card 
        ref={cardRef}
        className="shadow-lg mb-6"
        onTouchStart={handleTouchStart}
        onTouchEnd={(e) => handleTouchEnd(e, handleSwipe)}
      >
        <CardHeader className="pb-4">
          <CardTitle className="text-lg leading-relaxed">{question?.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {question?.options.map((option) => (
            <Button
              key={option.id}
              variant={selectedAnswer === option.value ? "default" : "outline"}
              className="w-full text-left justify-start h-auto p-4 touch-manipulation"
              onClick={() => handleAnswer(option.value)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswer === option.value 
                    ? 'border-white bg-white' 
                    : 'border-gray-300'
                }`}>
                  {selectedAnswer === option.value && (
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  )}
                </div>
                <span className="text-sm leading-relaxed">{option.text}</span>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          disabled={currentQuestion === 0}
          onClick={previousQuestion}
          className="touch-manipulation"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentQuestion(questions.length - 1)}
          className="touch-manipulation"
        >
          <SkipForward className="h-4 w-4 mr-1" />
          Skip
        </Button>

        <Button
          variant="outline"
          size="sm"
          disabled={currentQuestion === questions.length - 1}
          onClick={nextQuestion}
          className="touch-manipulation"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* Swipe Hint */}
      <p className="text-xs text-center text-muted-foreground mt-4">
        Swipe left/right to navigate • Tap to select
      </p>
    </div>
  );
};
