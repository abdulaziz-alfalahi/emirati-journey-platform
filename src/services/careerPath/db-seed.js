
import { supabase } from '@/integrations/supabase/client';

/**
 * Seed the database with sample career paths and stages
 */
export const seedCareerPaths = async () => {
  try {
    // Check if we already have career paths
    const { data: existingPaths } = await supabase
      .from('career_paths')
      .select('id')
      .limit(1);
      
    if (existingPaths && existingPaths.length > 0) {
      console.log('Career paths already exist, skipping seed');
      return;
    }
    
    // Sample career paths
    const careerPaths = [
      {
        title: 'Software Developer',
        industry: 'Technology',
        description: 'A comprehensive path to becoming a professional software developer, from fundamentals to advanced concepts.'
      },
      {
        title: 'Data Scientist',
        industry: 'Technology',
        description: 'Master data analysis, machine learning, and statistical modeling to become a data scientist.'
      },
      {
        title: 'Project Manager',
        industry: 'Business',
        description: 'Learn the skills and methodologies required to successfully manage projects across industries.'
      },
      {
        title: 'Digital Marketing Specialist',
        industry: 'Marketing',
        description: 'Develop expertise in SEO, content marketing, social media, and paid advertising.'
      },
      {
        title: 'UX/UI Designer',
        industry: 'Design',
        description: 'Build skills in user experience research, interface design, and prototyping.'
      }
    ];
    
    // Insert career paths
    const { data: insertedPaths, error } = await supabase
      .from('career_paths')
      .insert(careerPaths)
      .select();
      
    if (error) {
      console.error('Error seeding career paths:', error);
      return;
    }
    
    if (!insertedPaths) {
      console.error('No career paths were inserted');
      return;
    }
    
    // Create stages for each career path
    for (const path of insertedPaths) {
      if (path.title === 'Software Developer') {
        await createSoftwareDeveloperStages(path.id);
      } else if (path.title === 'Data Scientist') {
        await createDataScientistStages(path.id);
      } else if (path.title === 'Project Manager') {
        await createProjectManagerStages(path.id);
      } else if (path.title === 'Digital Marketing Specialist') {
        await createDigitalMarketingStages(path.id);
      } else if (path.title === 'UX/UI Designer') {
        await createUXDesignerStages(path.id);
      }
    }
    
    console.log('Career paths and stages seeded successfully');
  } catch (error) {
    console.error('Error in seedCareerPaths:', error);
  }
};

const createSoftwareDeveloperStages = async (pathId: string) => {
  const stages = [
    {
      career_path_id: pathId,
      title: 'Computer Science Fundamentals',
      description: 'Learn the foundational concepts of computer science and programming.',
      order_index: 1,
      stage_type: 'education',
      duration: '6-12 months',
      skills: ['Programming Basics', 'Data Structures', 'Algorithms', 'Computer Architecture'],
      requirements: ['High school diploma or equivalent'],
      icon: 'code'
    },
    {
      career_path_id: pathId,
      title: 'Web Development Foundations',
      description: 'Master the core technologies of the web: HTML, CSS, and JavaScript.',
      order_index: 2,
      stage_type: 'education',
      duration: '3-6 months',
      skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
      requirements: ['Basic programming knowledge'],
      icon: 'globe'
    },
    {
      career_path_id: pathId,
      title: 'Front-End Development',
      description: 'Learn modern front-end frameworks and build interactive web applications.',
      order_index: 3,
      stage_type: 'education',
      duration: '4-8 months',
      skills: ['React', 'Vue', 'State Management', 'API Integration'],
      requirements: ['HTML/CSS/JavaScript proficiency'],
      icon: 'layout'
    },
    {
      career_path_id: pathId,
      title: 'Back-End Development',
      description: 'Build server-side applications, APIs, and database integrations.',
      order_index: 4,
      stage_type: 'education',
      duration: '4-8 months',
      skills: ['Node.js', 'Express', 'Databases', 'API Design'],
      requirements: ['JavaScript proficiency'],
      icon: 'server'
    },
    {
      career_path_id: pathId,
      title: 'Junior Developer',
      description: 'First professional role as a software developer, focusing on implementing features and fixing bugs.',
      order_index: 5,
      stage_type: 'career',
      duration: '1-2 years',
      skills: ['Version Control', 'Code Review', 'Testing', 'Documentation'],
      requirements: ['Portfolio of projects', 'Computer science or related degree/bootcamp'],
      icon: 'code2'
    },
    {
      career_path_id: pathId,
      title: 'Mid-Level Developer',
      description: 'Lead feature development, mentor junior developers, and contribute to architectural decisions.',
      order_index: 6,
      stage_type: 'career',
      duration: '2-4 years',
      skills: ['System Design', 'Performance Optimization', 'Advanced Debugging', 'Mentoring'],
      requirements: ['2+ years professional experience', 'Strong problem-solving skills'],
      icon: 'codePen'
    },
    {
      career_path_id: pathId,
      title: 'Senior Developer',
      description: 'Lead technical initiatives, architect solutions, and guide teams toward best practices.',
      order_index: 7,
      stage_type: 'career',
      duration: '3+ years',
      skills: ['Technical Leadership', 'Architecture Design', 'High-Scale Systems', 'Team Guidance'],
      requirements: ['4+ years professional experience', 'Demonstrated leadership abilities'],
      icon: 'terminal'
    }
  ];
  
  const { error } = await supabase
    .from('career_path_stages')
    .insert(stages);
    
  if (error) {
    console.error('Error creating Software Developer stages:', error);
  }
};

const createDataScientistStages = async (pathId: string) => {
  const stages = [
    {
      career_path_id: pathId,
      title: 'Statistics & Mathematics Foundations',
      description: 'Build a strong foundation in statistics, calculus, linear algebra, and probability.',
      order_index: 1,
      stage_type: 'education',
      duration: '4-8 months',
      skills: ['Statistics', 'Calculus', 'Linear Algebra', 'Probability'],
      requirements: ['High school diploma or equivalent'],
      icon: 'pieChart'
    },
    {
      career_path_id: pathId,
      title: 'Programming for Data Science',
      description: 'Learn Python, R, and SQL for data manipulation, analysis, and visualization.',
      order_index: 2,
      stage_type: 'education',
      duration: '3-6 months',
      skills: ['Python', 'R', 'SQL', 'Data Visualization'],
      requirements: ['Basic computer science knowledge'],
      icon: 'code'
    },
    {
      career_path_id: pathId,
      title: 'Machine Learning Fundamentals',
      description: 'Understand core machine learning algorithms, evaluation methods, and implementation techniques.',
      order_index: 3,
      stage_type: 'education',
      duration: '4-8 months',
      skills: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Feature Engineering'],
      requirements: ['Programming proficiency', 'Statistical knowledge'],
      icon: 'brain'
    },
    {
      career_path_id: pathId,
      title: 'Deep Learning & AI',
      description: 'Master neural networks, deep learning frameworks, and specialized AI techniques.',
      order_index: 4,
      stage_type: 'education',
      duration: '3-6 months',
      skills: ['Neural Networks', 'TensorFlow', 'PyTorch', 'Computer Vision', 'NLP'],
      requirements: ['Machine learning fundamentals'],
      icon: 'network'
    },
    {
      career_path_id: pathId,
      title: 'Data Analyst',
      description: 'First professional role analyzing data, creating reports, and extracting insights.',
      order_index: 5,
      stage_type: 'career',
      duration: '1-2 years',
      skills: ['Data Analysis', 'Dashboarding', 'Business Intelligence', 'Reporting'],
      requirements: ['Data analysis portfolio', 'Statistics background'],
      icon: 'barChart'
    },
    {
      career_path_id: pathId,
      title: 'Data Scientist',
      description: 'Build machine learning models, conduct experiments, and deliver data-driven solutions.',
      order_index: 6,
      stage_type: 'career',
      duration: '2-4 years',
      skills: ['Advanced ML Models', 'A/B Testing', 'Product Analytics', 'Research'],
      requirements: ['2+ years data experience', 'Strong programming skills'],
      icon: 'database'
    },
    {
      career_path_id: pathId,
      title: 'Senior Data Scientist / ML Engineer',
      description: 'Lead data science initiatives, architect ML systems, and mentor junior data scientists.',
      order_index: 7,
      stage_type: 'career',
      duration: '3+ years',
      skills: ['ML Engineering', 'MLOps', 'Advanced AI', 'Leadership'],
      requirements: ['4+ years professional experience', 'End-to-end project delivery'],
      icon: 'databaseZap'
    }
  ];
  
  const { error } = await supabase
    .from('career_path_stages')
    .insert(stages);
    
  if (error) {
    console.error('Error creating Data Scientist stages:', error);
  }
};

const createProjectManagerStages = async (pathId: string) => {
  const stages = [
    {
      career_path_id: pathId,
      title: 'Project Management Fundamentals',
      description: 'Learn the core concepts, methodologies, and tools of project management.',
      order_index: 1,
      stage_type: 'education',
      duration: '3-6 months',
      skills: ['Project Planning', 'Scope Management', 'Scheduling', 'Risk Management'],
      requirements: ['High school diploma or equivalent'],
      icon: 'clipboard'
    },
    // Add more stages for Project Manager
  ];
  
  const { error } = await supabase
    .from('career_path_stages')
    .insert(stages);
    
  if (error) {
    console.error('Error creating Project Manager stages:', error);
  }
};

const createDigitalMarketingStages = async (pathId: string) => {
  const stages = [
    {
      career_path_id: pathId,
      title: 'Digital Marketing Fundamentals',
      description: 'Understand the basics of digital marketing channels, strategies, and analytics.',
      order_index: 1,
      stage_type: 'education',
      duration: '2-4 months',
      skills: ['Marketing Principles', 'Digital Channels', 'Analytics Basics', 'Customer Journey'],
      requirements: ['High school diploma or equivalent'],
      icon: 'megaphone'
    },
    // Add more stages for Digital Marketing
  ];
  
  const { error } = await supabase
    .from('career_path_stages')
    .insert(stages);
    
  if (error) {
    console.error('Error creating Digital Marketing stages:', error);
  }
};

const createUXDesignerStages = async (pathId: string) => {
  const stages = [
    {
      career_path_id: pathId,
      title: 'Design Fundamentals',
      description: 'Learn the principles of visual design, typography, color theory, and composition.',
      order_index: 1,
      stage_type: 'education',
      duration: '3-6 months',
      skills: ['Visual Design', 'Typography', 'Color Theory', 'Layout'],
      requirements: ['High school diploma or equivalent'],
      icon: 'palette'
    },
    // Add more stages for UX Designer
  ];
  
  const { error } = await supabase
    .from('career_path_stages')
    .insert(stages);
    
  if (error) {
    console.error('Error creating UX Designer stages:', error);
  }
};
