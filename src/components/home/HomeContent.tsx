
import React from 'react';

const HomeContent: React.FC = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Welcome to EHRDC</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your gateway to professional growth and development opportunities in the UAE.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-3">Education Pathway</h3>
            <p className="text-muted-foreground">Explore educational programs and learning opportunities</p>
          </div>
          
          <div className="text-center p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-3">Career Entry</h3>
            <p className="text-muted-foreground">Find your path to professional success</p>
          </div>
          
          <div className="text-center p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-3">Professional Growth</h3>
            <p className="text-muted-foreground">Advance your skills and career</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContent;
