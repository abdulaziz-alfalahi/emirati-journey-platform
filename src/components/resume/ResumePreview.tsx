
import React from 'react';
import { ResumeTemplate, ResumeData } from './types';

interface ResumePreviewProps {
  template: ResumeTemplate;
  data: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ template, data }) => {
  return (
    <div className="bg-white border rounded-lg p-8 min-h-[1000px] max-w-4xl mx-auto shadow">
      {/* Basic preview - this could be expanded to full template rendering */}
      <div className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold mb-1">{data.personal.fullName || 'Your Name'}</h1>
        <h2 className="text-xl text-gray-600 mb-4">{data.personal.jobTitle || 'Your Position'}</h2>
        
        <div className="flex flex-wrap gap-4 text-sm">
          {data.personal.email && (
            <div>{data.personal.email}</div>
          )}
          {data.personal.phone && (
            <div>{data.personal.phone}</div>
          )}
          {data.personal.location && (
            <div>{data.personal.location}</div>
          )}
          {data.personal.linkedin && (
            <div>{data.personal.linkedin}</div>
          )}
        </div>
      </div>
      
      {data.summary && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-emirati-navy">Professional Summary</h3>
          <p>{data.summary}</p>
        </div>
      )}
      
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-emirati-navy">Work Experience</h3>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between">
                <h4 className="font-medium">{exp.position}</h4>
                <div className="text-sm text-gray-600">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </div>
              </div>
              <div className="text-gray-700">{exp.company}{exp.location ? `, ${exp.location}` : ''}</div>
              <p className="mt-2 text-sm">{exp.description}</p>
            </div>
          ))}
        </div>
      )}
      
      {data.education.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-emirati-navy">Education</h3>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between">
                <h4 className="font-medium">{edu.degree} in {edu.field}</h4>
                <div className="text-sm text-gray-600">
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                </div>
              </div>
              <div className="text-gray-700">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</div>
              {edu.description && <p className="mt-2 text-sm">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}
      
      {(data.skills.length > 0 || data.languages.length > 0) && (
        <div className="grid grid-cols-2 gap-6">
          {data.skills.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-emirati-navy">Skills</h3>
              <ul className="list-disc pl-5">
                {data.skills.map((skill) => (
                  <li key={skill.id}>
                    {skill.name} {skill.level && <span className="text-gray-600">({skill.level})</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {data.languages.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-emirati-navy">Languages</h3>
              <ul className="list-disc pl-5">
                {data.languages.map((lang) => (
                  <li key={lang.id}>
                    {lang.name} {lang.proficiency && <span className="text-gray-600">({lang.proficiency})</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
