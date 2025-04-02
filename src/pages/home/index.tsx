
import React from 'react';
import Layout from '@/components/layout/Layout';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold">Home Page</h1>
        <p className="mt-4">Welcome to the application!</p>
      </div>
    </Layout>
  );
};

export default HomePage;
