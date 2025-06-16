
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calculator, DollarSign, Info, TrendingUp } from 'lucide-react';
import { DirhamSign } from '@/components/icons/DirhamSign';

interface PensionCalculation {
  monthlyPension: number;
  annualPension: number;
  lumpSumOption: number;
  taxImplications: number;
  optimizationSuggestions: string[];
}

export const PensionCalculator: React.FC = () => {
  const [formData, setFormData] = useState({
    yearsOfService: '',
    finalSalary: '',
    pensionScheme: '',
    retirementAge: '',
    currentAge: ''
  });
  
  const [calculation, setCalculation] = useState<PensionCalculation | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const pensionSchemes = [
    { value: 'government', label: 'Government Employee Pension' },
    { value: 'private', label: 'Private Sector Pension' },
    { value: 'military', label: 'Military/Police Pension' },
    { value: 'eosb', label: 'End of Service Benefits' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculatePension = () => {
    setIsCalculating(true);
    
    // Simulate calculation
    setTimeout(() => {
      const yearsOfService = parseInt(formData.yearsOfService);
      const finalSalary = parseFloat(formData.finalSalary);
      
      // Basic pension calculation (simplified)
      const pensionPercentage = Math.min(yearsOfService * 2, 80) / 100;
      const monthlyPension = finalSalary * pensionPercentage;
      const annualPension = monthlyPension * 12;
      const lumpSumOption = annualPension * 10; // Simplified lump sum calculation
      const taxImplications = monthlyPension * 0.05; // Simplified tax calculation

      const optimizationSuggestions = [
        'Consider delaying retirement by 2 years to increase pension by 15%',
        'Evaluate lump sum vs monthly payments based on your financial goals',
        'Review healthcare benefit coordination with pension',
        'Consider tax-efficient withdrawal strategies'
      ];

      setCalculation({
        monthlyPension,
        annualPension,
        lumpSumOption,
        taxImplications,
        optimizationSuggestions
      });
      
      setIsCalculating(false);
    }, 1500);
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Pension Calculator
          </CardTitle>
          <CardDescription>
            Calculate your expected pension benefits and explore optimization strategies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="yearsOfService">Years of Service</Label>
              <Input
                id="yearsOfService"
                type="number"
                placeholder="Enter years of service"
                value={formData.yearsOfService}
                onChange={(e) => handleInputChange('yearsOfService', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="finalSalary">Final Monthly Salary (AED)</Label>
              <Input
                id="finalSalary"
                type="number"
                placeholder="Enter final salary"
                value={formData.finalSalary}
                onChange={(e) => handleInputChange('finalSalary', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pensionScheme">Pension Scheme</Label>
              <Select value={formData.pensionScheme} onValueChange={(value) => handleInputChange('pensionScheme', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select pension scheme" />
                </SelectTrigger>
                <SelectContent>
                  {pensionSchemes.map((scheme) => (
                    <SelectItem key={scheme.value} value={scheme.value}>
                      {scheme.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="retirementAge">Planned Retirement Age</Label>
              <Input
                id="retirementAge"
                type="number"
                placeholder="Enter retirement age"
                value={formData.retirementAge}
                onChange={(e) => handleInputChange('retirementAge', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentAge">Current Age</Label>
              <Input
                id="currentAge"
                type="number"
                placeholder="Enter current age"
                value={formData.currentAge}
                onChange={(e) => handleInputChange('currentAge', e.target.value)}
              />
            </div>

            <div className="flex items-end">
              <Button 
                onClick={calculatePension}
                disabled={!isFormValid || isCalculating}
                className="w-full"
              >
                {isCalculating ? 'Calculating...' : 'Calculate Pension'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {calculation && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DirhamSign className="h-5 w-5" />
                Pension Calculation Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Monthly Pension</span>
                  <span className="text-xl font-bold text-green-700">
                    AED {calculation.monthlyPension.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">Annual Pension</span>
                  <span className="text-lg font-semibold text-blue-700">
                    AED {calculation.annualPension.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium">Lump Sum Option</span>
                  <span className="text-lg font-semibold text-purple-700">
                    AED {calculation.lumpSumOption.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="font-medium">Est. Tax Impact</span>
                  <span className="text-lg font-semibold text-orange-700">
                    AED {calculation.taxImplications.toLocaleString()}/month
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Optimization Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {calculation.optimizationSuggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{suggestion}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" className="w-full">
                  Schedule Consultation with Financial Advisor
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Important Considerations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Badge variant="outline">Pension Types</Badge>
              </h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Government employee pension schemes</li>
                <li>• Private sector end-of-service benefits</li>
                <li>• Military and police pension systems</li>
                <li>• International pension transfers</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Badge variant="outline">Tax Considerations</Badge>
              </h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• UAE tax-free pension income</li>
                <li>• International tax obligations</li>
                <li>• Lump sum vs monthly payment tax efficiency</li>
                <li>• Inheritance tax planning</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
