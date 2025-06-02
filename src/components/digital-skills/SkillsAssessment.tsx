
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Target, TrendingUp, CheckCircle, Clock, ArrowRight } from 'lucide-react';

export const SkillsAssessment: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const assessmentCategories = [
    {
      id: 'data-literacy',
      name: 'Data Literacy & Analytics',
      questions: 8,
      description: 'Working with data, analysis, and visualization'
    },
    {
      id: 'programming',
      name: 'Programming & Development',
      questions: 10,
      description: 'Software development and coding skills'
    },
    {
      id: 'digital-marketing',
      name: 'Digital Marketing',
      questions: 6,
      description: 'Online marketing and social media strategies'
    },
    {
      id: 'cybersecurity',
      name: 'Cybersecurity',
      questions: 7,
      description: 'Information security and risk management'
    },
    {
      id: 'ai-ml',
      name: 'AI & Machine Learning',
      questions: 9,
      description: 'Artificial intelligence and machine learning concepts'
    },
    {
      id: 'cloud-computing',
      name: 'Cloud Computing',
      questions: 8,
      description: 'Cloud platforms and services'
    }
  ];

  const sampleQuestions = [
    {
      id: 1,
      category: 'data-literacy',
      question: 'How comfortable are you with creating data visualizations?',
      options: [
        { value: 'beginner', label: 'Never done it before' },
        { value: 'novice', label: 'Used basic tools like Excel charts' },
        { value: 'intermediate', label: 'Can use tools like Tableau or Power BI' },
        { value: 'advanced', label: 'Expert with multiple visualization tools' }
      ]
    },
    {
      id: 2,
      category: 'programming',
      question: 'What is your experience with programming languages?',
      options: [
        { value: 'beginner', label: 'No programming experience' },
        { value: 'novice', label: 'Basic knowledge of one language' },
        { value: 'intermediate', label: 'Comfortable with 2-3 languages' },
        { value: 'advanced', label: 'Expert in multiple languages and frameworks' }
      ]
    }
  ];

  const mockResults = {
    overall: 65,
    categories: [
      { name: 'Data Literacy', score: 75, level: 'Intermediate' },
      { name: 'Programming', score: 45, level: 'Beginner' },
      { name: 'Digital Marketing', score: 80, level: 'Advanced' },
      { name: 'Cybersecurity', score: 60, level: 'Intermediate' },
      { name: 'AI & ML', score: 30, level: 'Beginner' },
      { name: 'Cloud Computing', score: 55, level: 'Beginner' }
    ],
    recommendations: [
      'Focus on strengthening programming fundamentals',
      'Explore AI/ML basics through introductory courses',
      'Advance cloud computing skills for career growth'
    ]
  };

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const startAssessment = () => {
    setCurrentQuestion(1);
  };

  const nextQuestion = () => {
    if (currentQuestion < sampleQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              Assessment Complete
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">{mockResults.overall}%</div>
              <div className="text-muted-foreground">Overall Digital Skills Score</div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">Skills Breakdown</h3>
                <div className="space-y-4">
                  {mockResults.categories.map((category, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{category.name}</span>
                        <Badge variant={
                          category.level === 'Advanced' ? 'default' :
                          category.level === 'Intermediate' ? 'secondary' : 'outline'
                        }>
                          {category.level}
                        </Badge>
                      </div>
                      <Progress value={category.score} className="h-2" />
                      <div className="text-xs text-muted-foreground mt-1">{category.score}%</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Recommendations</h3>
                <div className="space-y-3">
                  {mockResults.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{rec}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                  Generate Learning Path
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentQuestion > 0) {
    const question = sampleQuestions[currentQuestion - 1];
    const progress = (currentQuestion / sampleQuestions.length) * 100;

    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Question {currentQuestion} of {sampleQuestions.length}</span>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">{question.question}</h3>
              <RadioGroup 
                value={answers[question.id]} 
                onValueChange={(value) => handleAnswerChange(question.id, value)}
              >
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50 transition-colors">
                    <RadioGroupItem value={option.value} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" disabled={currentQuestion === 1}>
                Previous
              </Button>
              <Button 
                onClick={nextQuestion}
                disabled={!answers[question.id]}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {currentQuestion === sampleQuestions.length ? 'Complete Assessment' : 'Next'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="text-center mb-8">
            <Target className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Digital Skills Assessment</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Take our comprehensive assessment to evaluate your current digital skills, 
              identify gaps, and receive personalized learning recommendations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {assessmentCategories.map((category) => (
              <div key={category.id} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>{category.questions} questions</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" onClick={startAssessment} className="bg-blue-600 hover:bg-blue-700">
              Start Assessment
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Estimated time: 15-20 minutes
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
