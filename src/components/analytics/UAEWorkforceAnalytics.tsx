
import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, TrendingUp, GraduationCap, Building } from 'lucide-react';

// Mock data for UAE workforce analytics
const skillsData = [
  { skill: 'Digital Marketing', count: 15420, demand: 'High', growth: 25 },
  { skill: 'Data Analysis', count: 12680, demand: 'Very High', growth: 40 },
  { skill: 'Project Management', count: 18950, demand: 'High', growth: 18 },
  { skill: 'Software Development', count: 9850, demand: 'Very High', growth: 55 },
  { skill: 'Financial Analysis', count: 11200, demand: 'Medium', growth: 12 },
  { skill: 'AI/Machine Learning', count: 4850, demand: 'Very High', growth: 85 },
  { skill: 'Cybersecurity', count: 6420, demand: 'High', growth: 45 },
  { skill: 'Cloud Computing', count: 5680, demand: 'High', growth: 60 }
];

const educationData = [
  { level: 'High School', count: 285000, percentage: 35, emirates: 'Abu Dhabi' },
  { level: 'Bachelor\'s Degree', count: 320000, percentage: 40, emirates: 'Dubai' },
  { level: 'Master\'s Degree', count: 160000, percentage: 20, emirates: 'Sharjah' },
  { level: 'PhD', count: 40000, percentage: 5, emirates: 'Ajman' }
];

const sectorsData = [
  { sector: 'Technology', employees: 125000, emiratis: 35000, emiratization: 28, growth: 15 },
  { sector: 'Finance & Banking', employees: 95000, emiratis: 47500, emiratization: 50, growth: 8 },
  { sector: 'Healthcare', employees: 180000, emiratis: 54000, emiratization: 30, growth: 12 },
  { sector: 'Education', employees: 140000, emiratis: 84000, emiratization: 60, growth: 5 },
  { sector: 'Tourism & Hospitality', employees: 220000, emiratis: 44000, emiratization: 20, growth: 22 },
  { sector: 'Manufacturing', employees: 160000, emiratis: 32000, emiratization: 20, growth: 10 },
  { sector: 'Government', employees: 180000, emiratis: 144000, emiratization: 80, growth: 3 }
];

const emiratizationTrends = [
  { year: '2020', overall: 38, private: 25, government: 75 },
  { year: '2021', overall: 40, private: 28, government: 78 },
  { year: '2022', overall: 42, private: 32, government: 80 },
  { year: '2023', overall: 45, private: 35, government: 82 },
  { year: '2024', overall: 48, private: 38, government: 85 }
];

const demographics = [
  { group: 'Emirati Citizens', count: 450000, percentage: 35 },
  { group: 'Arab Expatriates', count: 390000, percentage: 30 },
  { group: 'Asian Expatriates', count: 325000, percentage: 25 },
  { group: 'Western Expatriates', count: 130000, percentage: 10 }
];

const COLORS = ['#3BACB6', '#601E88', '#E74C3C', '#F39C12', '#27AE60', '#8E44AD', '#E67E22', '#2ECC71'];

const UAEWorkforceAnalytics = () => {
  const [selectedEmirate, setSelectedEmirate] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('2024');

  const emirates = ['all', 'Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'];
  const sectors = ['all', 'Technology', 'Finance & Banking', 'Healthcare', 'Education', 'Tourism & Hospitality', 'Manufacturing', 'Government'];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>UAE Workforce Analytics Dashboard</CardTitle>
          <CardDescription>Comprehensive insights into workforce trends across the United Arab Emirates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Emirates</label>
              <Select value={selectedEmirate} onValueChange={setSelectedEmirate}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Emirates" />
                </SelectTrigger>
                <SelectContent>
                  {emirates.map((emirate) => (
                    <SelectItem key={emirate} value={emirate}>
                      {emirate === 'all' ? 'All Emirates' : emirate}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Sector</label>
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Sector" />
                </SelectTrigger>
                <SelectContent>
                  {sectors.map((sector) => (
                    <SelectItem key={sector} value={sector}>
                      {sector === 'all' ? 'All Sectors' : sector}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Timeframe</label>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Workforce</p>
                <p className="text-2xl font-bold">1.29M</p>
                <p className="text-xs text-green-600">+5.2% from last year</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Emiratization Rate</p>
                <p className="text-2xl font-bold">48%</p>
                <p className="text-xs text-green-600">+3% from last year</p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Higher Education</p>
                <p className="text-2xl font-bold">65%</p>
                <p className="text-xs text-green-600">+2.5% from last year</p>
              </div>
              <GraduationCap className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Private Sector Growth</p>
                <p className="text-2xl font-bold">12%</p>
                <p className="text-xs text-green-600">+1.8% from last year</p>
              </div>
              <Building className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="skills" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="skills">Skills Distribution</TabsTrigger>
          <TabsTrigger value="education">Education Levels</TabsTrigger>
          <TabsTrigger value="sectors">Employment Sectors</TabsTrigger>
          <TabsTrigger value="emiratization">Emiratization Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Skills by Count</CardTitle>
                <CardDescription>Most prevalent skills in the UAE workforce</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={skillsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="skill" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value.toLocaleString()} professionals`} />
                    <Bar dataKey="count" fill="#3BACB6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills Growth Rate</CardTitle>
                <CardDescription>Year-over-year growth in demand</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={skillsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="skill" angle={-45} textAnchor="end" height={100} />
                    <YAxis unit="%" />
                    <Tooltip formatter={(value) => `${value}% growth`} />
                    <Bar dataKey="growth" fill="#E74C3C" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Skills Demand Analysis</CardTitle>
              <CardDescription>Current market demand for various skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {skillsData.map((skill, index) => (
                  <div key={skill.skill} className="p-4 border rounded-lg">
                    <h4 className="font-medium">{skill.skill}</h4>
                    <p className="text-sm text-muted-foreground">{skill.count.toLocaleString()} professionals</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant={
                        skill.demand === 'Very High' ? 'destructive' : 
                        skill.demand === 'High' ? 'default' : 'secondary'
                      }>
                        {skill.demand}
                      </Badge>
                      <span className="text-sm font-medium text-green-600">+{skill.growth}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Educational Attainment Distribution</CardTitle>
                <CardDescription>Breakdown of education levels across the workforce</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={educationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ level, percentage }) => `${level}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {educationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value.toLocaleString()} people`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Education by Count</CardTitle>
                <CardDescription>Absolute numbers for each education level</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={educationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="level" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value.toLocaleString()} people`} />
                    <Bar dataKey="count" fill="#601E88" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sectors" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Employment by Sector</CardTitle>
                <CardDescription>Total workforce distribution across sectors</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sectorsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sector" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value.toLocaleString()} employees`} />
                    <Bar dataKey="employees" fill="#3BACB6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sector Growth Rates</CardTitle>
                <CardDescription>Year-over-year employment growth by sector</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sectorsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sector" angle={-45} textAnchor="end" height={100} />
                    <YAxis unit="%" />
                    <Tooltip formatter={(value) => `${value}% growth`} />
                    <Bar dataKey="growth" fill="#F39C12" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sector Demographics</CardTitle>
              <CardDescription>Workforce composition by nationality</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={demographics}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ group, percentage }) => `${group}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {demographics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value.toLocaleString()} people`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emiratization" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Emiratization Trends</CardTitle>
                <CardDescription>Progress over time in both public and private sectors</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={emiratizationTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis unit="%" />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Line type="monotone" dataKey="overall" stroke="#3BACB6" strokeWidth={2} name="Overall" />
                    <Line type="monotone" dataKey="private" stroke="#E74C3C" strokeWidth={2} name="Private Sector" />
                    <Line type="monotone" dataKey="government" stroke="#27AE60" strokeWidth={2} name="Government" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emiratization by Sector</CardTitle>
                <CardDescription>Current Emirati representation across different sectors</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sectorsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sector" angle={-45} textAnchor="end" height={100} />
                    <YAxis unit="%" />
                    <Tooltip formatter={(value) => `${value}% Emiratization`} />
                    <Bar dataKey="emiratization" fill="#601E88" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Emiratization Progress by Sector</CardTitle>
              <CardDescription>Detailed breakdown of Emirati workforce participation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sectorsData.map((sector) => (
                  <div key={sector.sector} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{sector.sector}</h4>
                      <Badge variant={sector.emiratization >= 50 ? 'default' : sector.emiratization >= 30 ? 'secondary' : 'destructive'}>
                        {sector.emiratization}% Emiratization
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Total: {sector.employees.toLocaleString()} employees</span>
                      <span>Emiratis: {sector.emiratis.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-emirati-teal h-2 rounded-full" 
                        style={{ width: `${sector.emiratization}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UAEWorkforceAnalytics;
