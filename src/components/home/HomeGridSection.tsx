
import React from 'react';

const HomeGridSection: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Services</h2>
          <p className="text-lg text-muted-foreground">
            Discover the tools and resources to accelerate your professional journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-2">Career Planning</h3>
            <p className="text-sm text-muted-foreground">Plan your career path with expert guidance</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-2">Skill Assessment</h3>
            <p className="text-sm text-muted-foreground">Evaluate and enhance your professional skills</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-2">Job Matching</h3>
            <p className="text-sm text-muted-foreground">Find opportunities that match your profile</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-2">Training Programs</h3>
            <p className="text-sm text-muted-foreground">Access professional development courses</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeGridSection;
