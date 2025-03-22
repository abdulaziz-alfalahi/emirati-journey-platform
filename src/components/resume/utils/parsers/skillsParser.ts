
import { ResumeData } from '../../types';
import { v4 as uuidv4 } from 'uuid';

// Extract skills from resume content
export const extractSkills = (content: string): ResumeData['skills'] => {
  const skills: ResumeData['skills'] = [];
  
  // Look for sections that might contain skills
  const skillsSectionRegex = /(?:skills|technical skills|core competencies|expertise)(?:[\s\S]*?)(?:work experience|education|certification|languages|references|projects|$)/i;
  const skillsSection = content.match(skillsSectionRegex);
  
  if (skillsSection && skillsSection[0]) {
    const skillsContent = skillsSection[0];
    
    // Extract skills - look for comma-separated lists, bullet points, etc.
    const skillsRegex = /[•\-*]\s*([A-Za-z0-9#\+\s]+)|\b([A-Za-z0-9#\+]{2,}(?:\s[A-Za-z0-9#\+]+)*)\b(?=,|\n|\.)/g;
    
    let match;
    const foundSkills = new Set<string>();
    
    while ((match = skillsRegex.exec(skillsContent)) !== null) {
      const skill = (match[1] || match[2]).trim();
      
      // Filter out common non-skill words
      const nonSkillWords = ['and', 'or', 'with', 'years', 'including', 'etc', 'such', 'as', 'various', 'other'];
      if (skill.length > 1 && !nonSkillWords.includes(skill.toLowerCase())) {
        foundSkills.add(skill);
      }
    }
    
    foundSkills.forEach(skill => {
      skills.push({
        id: uuidv4(),
        name: skill,
        level: determineSkillLevel(skill, content),
      });
    });
  }
  
  return skills;
};

// Helper function to determine skill level
const determineSkillLevel = (skill: string, content: string): 'beginner' | 'intermediate' | 'advanced' | 'expert' => {
  const skillContext = content.match(new RegExp(`.{0,100}${skill}.{0,100}`, 'i'));
  
  if (!skillContext) return 'intermediate';
  
  const contextText = skillContext[0].toLowerCase();
  
  if (contextText.includes('expert') || contextText.includes('mastery') || contextText.includes('advanced')) {
    return 'expert';
  } else if (contextText.includes('proficient') || contextText.includes('strong')) {
    return 'advanced';
  } else if (contextText.includes('beginner') || contextText.includes('basic')) {
    return 'beginner';
  } else {
    return 'intermediate';
  }
};
