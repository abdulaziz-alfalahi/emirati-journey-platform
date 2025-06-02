
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  Brain, Star, TrendingUp, Users, Clock, 
  CheckCircle, ArrowRight, Bookmark, Target 
} from 'lucide-react';

export const PersonalizedRecommendations: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const questions = [
    {
      id: 0,
      question: 'What type of work environment do you prefer?',
      options: [
        { value: 'office', label: 'Traditional office setting', industries: ['finance', 'healthcare'] },
        { value: 'field', label: 'Field work and on-site projects', industries: ['construction', 'energy'] },
        { value: 'remote', label: 'Flexible and remote work', industries: ['technology'] },
        { value: 'customer', label: 'Customer-facing environments', industries: ['tourism', 'retail'] }
      ]
    },
    {
      id: 1,
      question: 'Which skills do you excel at or enjoy most?',
      options: [
        { value: 'analytical', label: 'Data analysis and problem-solving', industries: ['finance', 'technology'] },
        { value: 'creative', label: 'Creative and design thinking', industries: ['tourism', 'marketing'] },
        { value: 'technical', label: 'Technical and engineering skills', industries: ['energy', 'construction'] },
        { value: 'interpersonal', label: 'Communication and people skills', industries: ['healthcare', 'tourism'] }
      ]
    },
    {
      id: 2,
      question: 'What motivates you most in your career?',
      options: [
        { value: 'impact', label: 'Making a positive social impact', industries: ['healthcare', 'education'] },
        { value: 'innovation', label: 'Working with cutting-edge technology', industries: ['technology', 'energy'] },
        { value: 'stability', label: 'Job security and stable growth', industries: ['finance', 'government'] },
        { value: 'variety', label: 'Diverse projects and experiences', industries: ['tourism', 'consulting'] }
      ]
    },
    {
      id: 3,
      question: 'How do you prefer to work?',
      options: [
        { value: 'team', label: 'Collaborative team environment', industries: ['healthcare', 'technology'] },
        { value: 'independent', label: 'Independent with minimal supervision', industries: ['finance', 'consulting'] },
        { value: 'leadership', label: 'Leading and managing others', industries: ['construction', 'energy'] },
        { value: 'specialized', label: 'Deep specialization in expertise', industries: ['healthcare', 'technology'] }
      ]
    },
    {
      id: 4,
      question: 'What pace of work suits you best?',
      options: [
        { value: 'fast', label: 'Fast-paced and dynamic', industries: ['technology', 'finance'] },
        { value: 'steady', label: 'Steady and consistent rhythm', industries: ['healthcare', 'education'] },
        { value: 'project', label: 'Project-based with varying intensity', industries: ['construction', 'consulting'] },
        { value: 'seasonal', label: 'Seasonal peaks and quiet periods', industries: ['tourism', 'retail'] }
      ]
    }
  ];

  const mockRecommendations = [
    {
      industry: 'Technology & AI',
      match: 92,
      description: 'High match based on your analytical skills and innovation preference',
      reasons: ['Strong analytical thinking', 'Interest in innovation', 'Preference for flexible work'],
      careerPaths: ['Software Developer', 'Data Scientist', 'AI Engineer'],
      growth: 45,
      emiratization: 55,
      avgSalary: '25,000 - 45,000 AED',
      nextSteps: ['Complete coding bootcamp', 'Build portfolio projects', 'Network with tech professionals']
    },
    {
      industry: 'Banking & Finance',
      match: 88,
      description: 'Excellent fit for analytical minds seeking stability and growth',
      reasons: ['Analytical problem-solving', 'Preference for office environment', 'Career stability focus'],
      careerPaths: ['Financial Analyst', 'Investment Advisor', 'Risk Manager'],
      growth: 22,
      emiratization: 78,
      avgSalary: '20,000 - 40,000 AED',
      nextSteps: ['Pursue CFA certification', 'Gain financial modeling skills', 'Join finance community']
    },
    {
      industry: 'Healthcare',
      match: 76,
      description: 'Good match for those wanting to make a positive impact',
      reasons: ['Desire for social impact', 'People-oriented approach', 'Team collaboration skills'],
      careerPaths: ['Healthcare Administrator', 'Public Health Specialist', 'Medical Technology'],
      growth: 25,
      emiratization: 72,
      avgSalary: '18,000 - 50,000 AED',
      nextSteps: ['Explore healthcare programs', 'Volunteer at health facilities', 'Consider medical training']
    }
  ];

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const getMatchColor = (match: number) => {
    if (match >= 85) return 'text-green-600 bg-green-50';
    if (match >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  if (showResults) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-ehrdc-teal">
              <Target className="h-5 w-5" />
              Your Personalized Industry Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="text-sm text-ehrdc-neutral-dark/70 mb-2">
                Based on your responses, here are your top industry matches
              </div>
              <Button onClick={restartQuiz} variant="outline" size="sm">
                Retake Assessment
              </Button>
            </div>

            <div className="space-y-6">
              {mockRecommendations.map((rec, index) => (
                <Card key={index} className={`border-2 ${index === 0 ? 'border-ehrdc-teal/30 bg-ehrdc-teal/5' : 'border-ehrdc-neutral-light'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-ehrdc-teal">{rec.industry}</h3>
                          {index === 0 && <Badge className="bg-ehrdc-teal text-white">Best Match</Badge>}
                        </div>
                        <p className="text-ehrdc-neutral-dark/70 mb-3">{rec.description}</p>
                      </div>
                      <div className="text-center ml-4">
                        <div className={`text-3xl font-bold rounded-lg px-3 py-2 ${getMatchColor(rec.match)}`}>
                          {rec.match}%
                        </div>
                        <div className="text-xs text-ehrdc-neutral-dark/70 mt-1">Match Score</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-4">
                      <div>
                        <h4 className="font-medium mb-2">Why This Matches You</h4>
                        <div className="space-y-1">
                          {rec.reasons.map((reason, idx) => (
                            <div key={idx} className="text-sm text-ehrdc-neutral-dark/70 flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              {reason}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Career Opportunities</h4>
                        <div className="space-y-1">
                          {rec.careerPaths.map((path, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs mr-1 mb-1">
                              {path}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-2 text-sm">
                          <div className="text-ehrdc-neutral-dark/70">Salary Range:</div>
                          <div className="font-medium text-ehrdc-teal">{rec.avgSalary}</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Industry Metrics</h4>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Growth Rate</span>
                              <span className="font-medium">{rec.growth}%</span>
                            </div>
                            <Progress value={rec.growth} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Emiratization</span>
                              <span className="font-medium">{rec.emiratization}%</span>
                            </div>
                            <Progress value={rec.emiratization} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Recommended Next Steps</h4>
                      <div className="grid md:grid-cols-3 gap-2">
                        {rec.nextSteps.map((step, idx) => (
                          <div key={idx} className="text-sm p-2 bg-ehrdc-neutral-light/30 rounded text-center">
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
                        Explore This Industry
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Bookmark className="h-4 w-4 mr-2" />
                        Save to Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-ehrdc-teal to-ehrdc-dark-teal text-white">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Ready to Take the Next Step?</h3>
                <p className="mb-4 opacity-90">
                  Connect with career advisors to create your personalized development plan
                </p>
                <Button className="bg-white text-ehrdc-teal hover:bg-ehrdc-neutral-light">
                  Schedule Career Consultation
                </Button>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (quizStarted) {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-ehrdc-neutral-dark/70">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm text-ehrdc-neutral-dark/70">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4 text-ehrdc-teal">{question.question}</h3>
              <RadioGroup 
                value={answers[question.id]} 
                onValueChange={(value) => handleAnswerChange(question.id, value)}
              >
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 border border-ehrdc-neutral-light rounded-lg hover:bg-ehrdc-neutral-light/20 transition-colors">
                    <RadioGroupItem value={option.value} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex justify-between">
              <Button 
                variant="outline" 
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
              >
                Previous
              </Button>
              <Button 
                onClick={nextQuestion}
                disabled={!answers[question.id]}
                className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal"
              >
                {currentQuestion === questions.length - 1 ? 'Get Recommendations' : 'Next'}
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
      {/* Introduction */}
      <Card>
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-ehrdc-teal/10 rounded-full p-4">
              <Brain className="h-16 w-16 text-ehrdc-teal" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-ehrdc-teal mb-2">Industry Matching Assessment</h2>
          <p className="text-ehrdc-neutral-dark/70 max-w-2xl mx-auto mb-6">
            Take our personalized assessment to discover which industries align with your skills, 
            interests, and career goals. Get tailored recommendations with actionable next steps.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <Clock className="h-8 w-8 text-ehrdc-teal mx-auto mb-2" />
              <div className="font-medium">5 Minutes</div>
              <div className="text-sm text-ehrdc-neutral-dark/70">Quick assessment</div>
            </div>
            <div className="text-center">
              <Target className="h-8 w-8 text-ehrdc-teal mx-auto mb-2" />
              <div className="font-medium">Personalized</div>
              <div className="text-sm text-ehrdc-neutral-dark/70">Tailored to you</div>
            </div>
            <div className="text-center">
              <Star className="h-8 w-8 text-ehrdc-teal mx-auto mb-2" />
              <div className="font-medium">Actionable</div>
              <div className="text-sm text-ehrdc-neutral-dark/70">Clear next steps</div>
            </div>
          </div>

          <Button size="lg" onClick={startQuiz} className="bg-ehrdc-teal hover:bg-ehrdc-dark-teal">
            Start Assessment
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardContent>
      </Card>

      {/* Sample Results Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-ehrdc-teal">What You'll Discover</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Industry Match Scores</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm">Technology & AI</span>
                  <div className="text-green-600 font-semibold">92% Match</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm">Banking & Finance</span>
                  <div className="text-yellow-600 font-semibold">78% Match</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm">Healthcare</span>
                  <div className="text-blue-600 font-semibold">65% Match</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Personalized Insights</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Career paths aligned with your interests
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Skills development recommendations
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Industry growth and opportunity insights
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Emiratization program eligibility
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Next steps action plan
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
