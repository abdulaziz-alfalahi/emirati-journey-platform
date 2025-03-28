
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useJobDescription } from './hooks/useJobDescription';
import { JobDescriptionInput } from './form/JobDescriptionInput';
import { ApiStatusAlerts } from './form/ApiStatusAlerts';
import { ParsedDataForm } from './form/ParsedDataForm';
import { Actions } from './form/Actions';

export function JobDescriptionForm() {
  const {
    jobDescription,
    setJobDescription,
    parsedData,
    isLoading,
    isSaving,
    apiStatus,
    errorMessage,
    manualFields,
    setManualFields,
    handleSubmit,
    handleSaveToDatabase,
    testDatabaseInsert,
    viewSavedJobDescriptions
  } = useJobDescription();

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Job Description Parser</CardTitle>
              <CardDescription>
                Parse job descriptions to extract structured information for matching with candidates
              </CardDescription>
            </div>
            <Actions 
              testDatabaseInsert={testDatabaseInsert}
              viewSavedJobDescriptions={viewSavedJobDescriptions}
            />
          </div>
        </CardHeader>
        <CardContent>
          <JobDescriptionInput
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
          
          <div className="mt-4">
            <ApiStatusAlerts 
              apiStatus={apiStatus} 
              errorMessage={errorMessage} 
            />
          </div>
          
          <ParsedDataForm
            parsedData={parsedData}
            manualFields={manualFields}
            setManualFields={setManualFields}
            handleSaveToDatabase={handleSaveToDatabase}
            isSaving={isSaving}
          />
        </CardContent>
      </Card>
    </div>
  );
}
