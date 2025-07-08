
import React from 'react';
import Layout from '@/components/layout/Layout';
import SimpleTestForm from '@/components/test/SimpleTestForm';
import TestPersonalInfoFields from '@/components/test/TestPersonalInfoFields';

const TestFormPage = () => {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Form Input Test Page</h1>
        <p className="text-center mb-8 text-gray-600">
          This page contains simple test forms to isolate and troubleshoot input handling issues.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <h2 className="text-xl font-semibold mb-4">Simple Form</h2>
            <SimpleTestForm />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Personal Info Form</h2>
            <TestPersonalInfoFields />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TestFormPage;
