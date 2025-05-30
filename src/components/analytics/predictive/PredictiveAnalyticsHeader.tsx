
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain } from 'lucide-react';

interface PredictiveAnalyticsHeaderProps {
  selectedTimeHorizon: string;
  onTimeHorizonChange: (value: string) => void;
  selectedModel: string;
  onModelChange: (value: string) => void;
}

export const PredictiveAnalyticsHeader: React.FC<PredictiveAnalyticsHeaderProps> = ({
  selectedTimeHorizon,
  onTimeHorizonChange,
  selectedModel,
  onModelChange
}) => {
  return (
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
              <Select value={selectedTimeHorizon} onValueChange={onTimeHorizonChange}>
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
              <Select value={selectedModel} onValueChange={onModelChange}>
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
  );
};
