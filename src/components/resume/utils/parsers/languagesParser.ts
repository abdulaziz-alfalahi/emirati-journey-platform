
import { ResumeData } from '../../types';
import { v4 as uuidv4 } from 'uuid';

// Extract languages from resume content
export const extractLanguages = (content: string): ResumeData['languages'] => {
  const languages: ResumeData['languages'] = [];
  
  // Look for sections that might contain languages
  const languagesSectionRegex = /(?:languages|language proficiency|language skills)(?:[\s\S]*?)(?:work experience|education|skills|certification|references|projects|$)/i;
  const languagesSection = content.match(languagesSectionRegex);
  
  if (languagesSection && languagesSection[0]) {
    const langContent = languagesSection[0];
    
    // Common languages
    const commonLanguages = [
      'English', 'Arabic', 'French', 'Spanish', 'German', 'Chinese', 'Japanese', 
      'Russian', 'Hindi', 'Urdu', 'Tagalog', 'Bengali', 'Portuguese', 'Italian'
    ];
    
    // Check for each common language
    commonLanguages.forEach(language => {
      if (new RegExp(`\\b${language}\\b`, 'i').test(langContent)) {
        let proficiency: 'basic' | 'conversational' | 'fluent' | 'native' = 'conversational';
        
        // Try to determine proficiency
        if (new RegExp(`\\b${language}\\b[^.]*?native`, 'i').test(langContent)) {
          proficiency = 'native';
        } else if (new RegExp(`\\b${language}\\b[^.]*?fluent`, 'i').test(langContent)) {
          proficiency = 'fluent';
        } else if (new RegExp(`\\b${language}\\b[^.]*?basic`, 'i').test(langContent)) {
          proficiency = 'basic';
        }
        
        languages.push({
          id: uuidv4(),
          name: language,
          proficiency,
        });
      }
    });
    
    // If no languages found, try a different approach
    if (languages.length === 0) {
      const languageRegex = /[•\-*]\s*([A-Za-z]+)|\b([A-Za-z]+)\b(?=:|\s*-|\s*–)/g;
      
      let match;
      while ((match = languageRegex.exec(langContent)) !== null) {
        const language = (match[1] || match[2]).trim();
        
        // Skip common non-language words
        const nonLanguageWords = ['skills', 'proficiency', 'include', 'languages', 'section'];
        if (!nonLanguageWords.includes(language.toLowerCase()) && language.length > 2) {
          languages.push({
            id: uuidv4(),
            name: language,
            proficiency: 'conversational', // Default
          });
        }
      }
    }
  }
  
  return languages;
};
