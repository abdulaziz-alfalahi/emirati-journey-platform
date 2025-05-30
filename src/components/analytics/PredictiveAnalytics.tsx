
import React, { useState, useMemo } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ScatterChart,
  Scatter
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, Brain, Target, AlertTriangle } from 'lucide-react';

// Mock historical and predicted data
const historicalWorkforceData = [
  { year: '2020', actual: 785000, sector: 'All', confidence: 100 },
  { year: '2021', actual: 812000, sector: 'All', confidence: 100 },
  { year: '2022', actual: 834000, sector: 'All', confidence: 100 },
  { year: '2023', actual: 850000, sector: 'All', confidence: 100 },
  { year: '2024', actual: 875000, sector: 'All', confidence: 100 },
];

const predictedWorkforceData = [
  { year: '2025', predicted: 905000, lower: 885000, upper: 925000, confidence: 85 },
  { year: '2026', predicted: 938000, lower: 910000, upper: 965000, confidence: 78 },
  { year: '2027', predicted: 975000, lower: 940000, upper: 1010000, confidence: 72 },
  { year: '2028', predicted: 1015000, lower: 975000, upper: 1055000, confidence: 65 },
  { year: '2029', predicted: 1058000, lower: 1010000, upper: 1105000, confidence: 58 },
];

const skillsDemandForecast = [
  { skill: 'AI/Machine Learning', current: 4850, predicted2025: 12500, predicted2027: 28000, growth: 185, demandLevel: 'Very High' },
  { skill: 'Cybersecurity', current: 6420, predicted2025: 11200, predicted2027: 18500, growth: 145, demandLevel: 'Very High' },
  { skill: 'Cloud Computing', current: 5680, predicted2025: 13500, predicted2027: 25000, growth: 160, demandLevel: 'Very High' },
  { skill: 'Data Analysis', current: 12680, predicted2025: 18500, predicted2027: 28000, growth: 85, demandLevel: 'High' },
  { skill: 'Digital Marketing', current: 15420, predicted2025: 22000, predicted2027: 32000, growth: 65, demandLevel: 'High' },
  { skill: 'Software Development', current: 9850, predicted2025: 16800, predicted2027: 28500, growth: 75, demandLevel: 'High' },
];

const sectorGrowthPredictions = [
  { 
    sector: 'Technology', 
    currentEmployees: 125000,
    predicted2025: 165000,
    predicted2027: 220000,
    growthRate: 12.5,
    driverFactors: ['AI adoption', 'Digital transformation', 'Smart city initiatives']
  },
  { 
    sector: 'Healthcare', 
    currentEmployees: 180000,
    predicted2025: 215000,
    predicted2027: 260000,
    growthRate: 8.2,
    driverFactors: ['Aging population', 'Medical tourism', 'Healthcare digitization']
  },
  { 
    sector: 'Tourism & Hospitality', 
    currentEmployees: 220000,
    predicted2025: 285000,
    predicted2027: 350000,
    growthRate: 10.5,
    driverFactors: ['Expo impact', 'Cultural initiatives', 'Entertainment expansion']
  },
  { 
    sector: 'Finance & Banking', 
    currentEmployees: 95000,
    predicted2025: 115000,
    predicted2027: 140000,
    growthRate: 8.8,
    driverFactors: ['Fintech growth', 'Cryptocurrency regulation', 'Investment banking']
  }
];

const emiratizationProjections = [
  { year: '2020', actual: 38, target: 40, projected: null },
  { year: '2021', actual: 40, target: 42, projected: null },
  { year: '2022', actual: 42, target: 44, projected: null },
  { year: '2023', actual: 45, target: 47, projected: null },
  { year: '2024', actual: 48, target: 50, projected: null },
  { year: '2025', actual: null, target: 52, projected: 51.2 },
  { year: '2026', actual: null, target: 54, projected: 53.8 },
  { year: '2027', actual: null, target: 56, projected: 56.5 },
  { year: '2028', actual: null, target: 58, projected: 59.1 },
  { year: '2029', actual: null, target: 60, projected: 61.8 },
];

interface PredictiveAnalyticsProps {
  selectedFilters?: {
    emirate: string;
    sector: string;
    timeframe: string;
  };
}

export const PredictiveAnalytics: React.FC<PredictiveAnalyticsProps> = ({
  selectedFilters = { emirate: 'all', sector: 'all', timeframe: '2024' }
}) => {
  const [selectedTimeHorizon, setSelectedTimeHorizon] = useState('5-year');
  const [selectedModel, setSelectedModel] = useState('ml-ensemble');

  // Combine historical and predicted data
  const combinedWorkforceData = useMemo(() => {
    return [
      ...historicalWorkforceData,
      ...predictedWorkforceData.map(item => ({
        year: item.year,
        actual: null,
        predicted: item.predicted,
        lower: item.lower,
        upper: item.upper,
        confidence: item.confidence
      }))
    ];
  }, []);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return '#27AE60';
    if (confidence >= 70) return '#F39C12';
    return '#E74C3C';
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Predictive Analytics & Forecasting
              </CardTitle>
              <CardDescription>AI-powered workforce trend predictions and scenario modeling</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Time Horizon</label>
                <Select value={selectedTimeHorizon} onValueChange={setSelectedTimeHorizon}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3-year">3 Years</SelectItem>
                    <SelectItem value="5-year">5 Years</SelectItem>
                    <SelectItem value="10-year">10 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Model Type</label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ml-ensemble">ML Ensemble</SelectItem>
                    <SelectItem value="regression">Linear Regression</SelectItem>
                    <SelectItem value="arima">ARIMA</SelectItem>
                    <SelectItem value="neural-network">Neural Network</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Predictions Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Workforce Growth (2029)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+20.9%</div>
            <div className="text-sm text-muted-foreground">1.06M projected workforce</div>
            <Badge variant="outline" className="mt-2">High Confidence</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Top Growth Sector</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">Technology</div>
            <div className="text-sm text-muted-foreground">12.5% annual growth</div>
            <Badge variant="outline" className="mt-2">220K by 2027</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Skills Gap Alert</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">AI/ML</div>
            <div className="text-sm text-muted-foreground">185% demand increase</div>
            <Badge variant="destructive" className="mt-2">Critical Shortage</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Emiratization Target</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">61.8%</div>
            <div className="text-sm text-muted-foreground">Projected by 2029</div>
            <Badge variant="outline" className="mt-2">On Track</Badge>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="workforce-forecast" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="workforce-forecast">Workforce Forecast</TabsTrigger>
          <TabsTrigger value="skills-demand">Skills Demand</TabsTrigger>
          <TabsTrigger value="sector-growth">Sector Growth</TabsTrigger>
          <TabsTrigger value="emiratization">Emiratization</TabsTrigger>
        </TabsList>

        <TabsContent value="workforce-forecast" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Overall Workforce Growth Forecast</CardTitle>
              <CardDescription>Historical data with AI-powered predictions and confidence intervals</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={combinedWorkforceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'actual') return [`${value?.toLocaleString()} people`, 'Historical'];
                      if (name === 'predicted') return [`${value?.toLocaleString()} people`, 'Predicted'];
                      if (name === 'upper') return [`${value?.toLocaleString()} people`, 'Upper Bound'];
                      if (name === 'lower') return [`${value?.toLocaleString()} people`, 'Lower Bound'];
                      return [value, name];
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="upper" 
                    stackId="1" 
                    stroke="#E74C3C" 
                    fill="#E74C3C" 
                    fillOpacity={0.1}
                    name="Upper Bound"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="lower" 
                    stackId="1" 
                    stroke="#E74C3C" 
                    fill="transparent" 
                    name="Lower Bound"
                  />
                  <Line type="monotone" dataKey="actual" stroke="#3BACB6" strokeWidth={3} name="Historical" />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#601E88" 
                    strokeWidth={3} 
                    strokeDasharray="5 5"
                    name="Predicted"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prediction Confidence Levels</CardTitle>
              <CardDescription>Model confidence decreases with longer forecast horizons</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={predictedWorkforceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis unit="%" />
                  <Tooltip formatter={(value) => [`${value}%`, 'Confidence Level']} />
                  <Bar 
                    dataKey="confidence" 
                    fill={(entry) => getConfidenceColor(entry.confidence)}
                    name="Confidence %"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills-demand" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Future Skills Demand Forecast</CardTitle>
              <CardDescription>Projected demand for key skills based on market trends and technology adoption</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={skillsDemandForecast} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="skill" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value?.toLocaleString()} professionals`} />
                  <Legend />
                  <Bar dataKey="current" fill="#3BACB6" name="Current (2024)" />
                  <Bar dataKey="predicted2025" fill="#601E88" name="Predicted 2025" />
                  <Bar dataKey="predicted2027" fill="#E74C3C" name="Predicted 2027" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills Growth Rate Analysis</CardTitle>
              <CardDescription>Expected percentage growth in demand by 2027</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skillsDemandForecast.map((skill, index) => (
                  <div key={skill.skill} className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">{skill.skill}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current:</span>
                        <span>{skill.current.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>2027 Projected:</span>
                        <span>{skill.predicted2027.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <Badge variant={skill.growth >= 100 ? 'destructive' : skill.growth >= 50 ? 'default' : 'secondary'}>
                          +{skill.growth}% Growth
                        </Badge>
                        <Badge variant="outline">
                          {skill.demandLevel}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sector-growth" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sector Growth Projections</CardTitle>
              <CardDescription>Employment forecasts by major economic sectors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sectorGrowthPredictions.map((sector, index) => (
                  <div key={sector.sector} className="p-6 border rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{sector.sector}</h3>
                        <p className="text-sm text-muted-foreground">
                          {sector.growthRate}% annual growth rate
                        </p>
                      </div>
                      <Badge variant="outline" className="text-green-600">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Growing
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium">Current (2024)</p>
                        <p className="text-2xl font-bold">{sector.currentEmployees.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">2025 Projection</p>
                        <p className="text-2xl font-bold text-blue-600">{sector.predicted2025.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">2027 Projection</p>
                        <p className="text-2xl font-bold text-green-600">{sector.predicted2027.toLocaleString()}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Key Growth Drivers:</p>
                      <div className="flex flex-wrap gap-2">
                        {sector.driverFactors.map((factor, idx) => (
                          <Badge key={idx} variant="secondary">{factor}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emiratization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Emiratization Progress & Projections</CardTitle>
              <CardDescription>Historical progress vs targets with future projections</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={emiratizationProjections} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis unit="%" />
                  <Tooltip formatter={(value) => [`${value}%`, 'Emiratization Rate']} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#3BACB6" 
                    strokeWidth={3}
                    name="Actual Progress"
                    connectNulls={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#E74C3C" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Government Target"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="projected" 
                    stroke="#601E88" 
                    strokeWidth={3}
                    strokeDasharray="3 3"
                    name="AI Projection"
                    connectNulls={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emiratization Achievement Analysis</CardTitle>
              <CardDescription>Likelihood of meeting government targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h3 className="font-semibold">2025 Target</h3>
                  <p className="text-2xl font-bold text-green-600">52%</p>
                  <p className="text-sm text-muted-foreground">Projected: 51.2%</p>
                  <Badge className="mt-2">Likely to Achieve</Badge>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <Target className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <h3 className="font-semibold">2027 Target</h3>
                  <p className="text-2xl font-bold text-orange-600">56%</p>
                  <p className="text-sm text-muted-foreground">Projected: 56.5%</p>
                  <Badge variant="secondary" className="mt-2">On Track</Badge>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <Target className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-semibold">2029 Target</h3>
                  <p className="text-2xl font-bold text-blue-600">60%</p>
                  <p className="text-sm text-muted-foreground">Projected: 61.8%</p>
                  <Badge variant="default" className="mt-2">Exceed Target</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
