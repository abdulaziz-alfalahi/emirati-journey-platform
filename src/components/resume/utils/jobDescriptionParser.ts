
/**
 * Job Description Parser Module
 *
 * This module handles the parsing of job descriptions to extract structured information.
 * It uses a similar approach to the enhanced resume parser but is specialized for job descriptions.
 */

import { v4 as uuidv4 } from 'uuid';

export class JobDescriptionParser {
  private sectionPatterns: Record<string, RegExp>;
  private employmentTypes: string[];
  private workModes: string[];
  private commonSkills: string[];
  private educationLevels: string[];
  private experiencePatterns: RegExp[];
  private salaryPatterns: RegExp[];
  private datePatterns: RegExp[];

  constructor() {
    // Section patterns
    this.sectionPatterns = {
      'title': /(?i)(job\s+title|position|role)/,
      'company': /(?i)(company|organization|employer)/,
      'location': /(?i)(location|place|city|region|country)/,
      'employment_type': /(?i)(employment\s+type|job\s+type|contract\s+type)/,
      'work_mode': /(?i)(work\s+mode|remote|on-site|hybrid)/,
      'description': /(?i)(job\s+description|about\s+the\s+job|about\s+the\s+role|overview)/,
      'responsibilities': /(?i)(responsibilities|duties|key\s+responsibilities|what\s+you'll\s+do)/,
      'requirements': /(?i)(requirements|qualifications|what\s+you\s+need|what\s+we're\s+looking\s+for)/,
      'education': /(?i)(education|academic|qualifications|degree)/,
      'experience': /(?i)(experience|work\s+experience|professional\s+experience)/,
      'skills': /(?i)(skills|technical\s+skills|competencies|expertise)/,
      'benefits': /(?i)(benefits|perks|what\s+we\s+offer|compensation)/,
      'salary': /(?i)(salary|compensation|pay|wage)/,
      'application': /(?i)(how\s+to\s+apply|application\s+process|next\s+steps)/,
      'deadline': /(?i)(deadline|closing\s+date|apply\s+by)/,
    };
    
    // Employment type patterns
    this.employmentTypes = [
      'full-time', 'part-time', 'contract', 'temporary', 'internship', 
      'freelance', 'permanent', 'casual', 'seasonal'
    ];
    
    // Work mode patterns
    this.workModes = ['remote', 'on-site', 'hybrid', 'flexible', 'work from home'];
    
    // Common skills list
    this.commonSkills = [
      // Programming Languages
      'Python', 'Java', 'JavaScript', 'C++', 'C#', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'Go', 'Rust',
      'TypeScript', 'Scala', 'Perl', 'R', 'MATLAB', 'Bash', 'Shell', 'SQL', 'HTML', 'CSS',
      
      // Frameworks & Libraries
      'React', 'Angular', 'Vue.js', 'Django', 'Flask', 'Spring', 'ASP.NET', 'Express', 'Node.js',
      'TensorFlow', 'PyTorch', 'Keras', 'Pandas', 'NumPy', 'Scikit-learn', 'jQuery', 'Bootstrap',
      
      // Tools & Platforms
      'Git', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Jenkins', 'Travis CI', 'CircleCI',
      'Jira', 'Confluence', 'Trello', 'Slack', 'GitHub', 'GitLab', 'Bitbucket',
      
      // Databases
      'MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Oracle', 'SQL Server', 'Redis', 'Elasticsearch',
      'Cassandra', 'DynamoDB', 'Firebase',
      
      // Methodologies
      'Agile', 'Scrum', 'Kanban', 'Waterfall', 'DevOps', 'CI/CD', 'TDD', 'BDD',
      
      // Soft Skills
      'Leadership', 'Communication', 'Teamwork', 'Problem Solving', 'Critical Thinking',
      'Time Management', 'Project Management', 'Customer Service', 'Negotiation',
    ];
    
    // Education level patterns
    this.educationLevels = [
      'high school', 'associate', 'bachelor', 'master', 'phd', 'doctorate', 'mba',
      'undergraduate', 'graduate', 'postgraduate', 'diploma', 'certificate'
    ];
    
    // Experience patterns
    this.experiencePatterns = [
      /(\d+)\+?\s+years?/,
      /minimum\s+of\s+(\d+)\s+years?/,
      /at\s+least\s+(\d+)\s+years?/,
      /(\d+)-(\d+)\s+years?/,
    ];
    
    // Salary patterns
    this.salaryPatterns = [
      /(\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*-\s*(\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/,
      /(\d{1,3}(?:,\d{3})*(?:\.\d{2})?k)\s*-\s*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?k)/,
      /up\s+to\s+(\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/,
      /starting\s+at\s+(\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/,
      /(\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s+per\s+(hour|year|month|week)/,
    ];
    
    // Date patterns
    this.datePatterns = [
      /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2},? \d{4}\b/,
      /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/,
      /\b\d{4}-\d{1,2}-\d{1,2}\b/,
    ];
  }

  /**
   * Parse a job description and extract structured information.
   * 
   * @param text Job description text
   * @returns Dictionary containing structured job description data
   */
  parseJobDescription(text: string): Record<string, any> {
    // Clean and normalize text
    text = this.cleanText(text);
    
    // Identify sections
    const sections = this.identifySections(text);
    
    // Extract basic job information
    const jobData = {
      title: this.extractJobTitle(text, sections),
      company: this.extractCompany(text, sections),
      location: this.extractLocation(text, sections),
      employmentType: this.extractEmploymentType(text, sections),
      workMode: this.extractWorkMode(text, sections),
      description: this.extractDescription(text, sections),
      responsibilities: this.extractResponsibilities(text, sections),
      requirements: {
        education: this.extractEducationRequirements(text, sections),
        experience: this.extractExperienceRequirements(text, sections),
        skills: this.extractSkills(text, sections),
        languages: this.extractLanguages(text, sections),
        certifications: this.extractCertifications(text, sections),
      },
      benefits: this.extractBenefits(text, sections),
      salary: this.extractSalary(text, sections),
      applicationDeadline: this.extractDeadline(text, sections),
      postedDate: this.extractPostedDate(text),
      keywords: this.extractKeywords(text),
    };
    
    return jobData;
  }

  /**
   * Clean and normalize the job description text.
   * 
   * @param text Raw job description text
   * @returns Cleaned and normalized text
   */
  private cleanText(text: string): string {
    if (!text) return "";
    
    // Replace multiple newlines with a single newline
    text = text.replace(/\n\s*\n/g, '\n\n');
    
    // Replace multiple spaces with a single space
    text = text.replace(/ +/g, ' ');
    
    // Remove non-printable characters
    text = text.replace(/[^\x20-\x7E\n]/g, '');
    
    return text.trim();
  }

  /**
   * Identify and extract sections from the job description.
   * 
   * @param text Cleaned job description text
   * @returns Dictionary mapping section names to their content
   */
  private identifySections(text: string): Record<string, string> {
    const sections: Record<string, string> = {};
    
    // Split text into lines
    const lines = text.split('\n');
    
    // Find potential section headers
    const sectionBoundaries: [number, string][] = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // Check if line matches any section pattern
      for (const [sectionName, pattern] of Object.entries(this.sectionPatterns)) {
        if (pattern.test(line)) {
          sectionBoundaries.push([i, sectionName]);
          break;
        }
      }
    }
    
    // Extract sections based on boundaries
    for (let i = 0; i < sectionBoundaries.length; i++) {
      const [startIdx, sectionName] = sectionBoundaries[i];
      
      // Determine end index
      const endIdx = i < sectionBoundaries.length - 1 ? sectionBoundaries[i + 1][0] : lines.length;
      
      // Extract content (skip the header line)
      const content = lines.slice(startIdx + 1, endIdx).join('\n').trim();
      
      sections[sectionName] = content;
    }
    
    // If no sections found, treat entire text as description
    if (Object.keys(sections).length === 0) {
      sections['description'] = text;
    }
    
    return sections;
  }

  /**
   * Extract job title from the job description.
   * 
   * @param text Job description text
   * @param sections Dictionary mapping section names to their content
   * @returns Job title
   */
  private extractJobTitle(text: string, sections: Record<string, string>): string {
    // Check if there's a title section
    if ('title' in sections && sections['title']) {
      return sections['title'].split('\n')[0].trim();
    }
    
    // Look for title in the first few lines
    const lines = text.split('\n');
    for (let i = 0; i < Math.min(5, lines.length); i++) {
      const line = lines[i].trim();
      if (line && line.length < 100) {  // Job titles are usually short
        return line;
      }
    }
    
    // Default to empty string if no title found
    return "";
  }

  /**
   * Extract company name from the job description.
   * 
   * @param text Job description text
   * @param sections Dictionary mapping section names to their content
   * @returns Company name
   */
  private extractCompany(text: string, sections: Record<string, string>): string {
    // Check if there's a company section
    if ('company' in sections && sections['company']) {
      return sections['company'].split('\n')[0].trim();
    }
    
    // Look for common company patterns
    const companyPatterns = [
      /Company:\s*([^,\n]+)/i,
      /Organization:\s*([^,\n]+)/i,
      /Employer:\s*([^,\n]+)/i,
    ];
    
    for (const pattern of companyPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
    
    return "";
  }

  /**
   * Extract location from the job description.
   * 
   * @param text Job description text
   * @param sections Dictionary mapping section names to their content
   * @returns Location
   */
  private extractLocation(text: string, sections: Record<string, string>): string {
    // Check if there's a location section
    if ('location' in sections && sections['location']) {
      return sections['location'].split('\n')[0].trim();
    }
    
    // Look for common location patterns
    const locationPatterns = [
      /Location:\s*([^,\n]+)/i,
      /based\s+in\s+([^,\n]+)/i,
      /position\s+in\s+([^,\n]+)/i,
    ];
    
    for (const pattern of locationPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
    
    return "";
  }

  /**
   * Extract employment type from the job description.
   * 
   * @param text Job description text
   * @param sections Dictionary mapping section names to their content
   * @returns Employment type
   */
  private extractEmploymentType(text: string, sections: Record<string, string>): string {
    // Check if there's an employment type section
    if ('employment_type' in sections && sections['employment_type']) {
      const content = sections['employment_type'].toLowerCase();
      for (const empType of this.employmentTypes) {
        if (content.includes(empType)) {
          return empType;
        }
      }
    }
    
    // Look for employment type in the entire text
    const textLower = text.toLowerCase();
    for (const empType of this.employmentTypes) {
      if (textLower.includes(empType)) {
        // Verify it's not part of another word
        if (new RegExp('\\b' + this.escapeRegExp(empType) + '\\b', 'i').test(textLower)) {
          return empType;
        }
      }
    }
    
    // Default to full-time if no employment type found
    return "full-time";
  }

  /**
   * Extract work mode from the job description.
   * 
   * @param text Job description text
   * @param sections Dictionary mapping section names to their content
   * @returns Work mode
   */
  private extractWorkMode(text: string, sections: Record<string, string>): string {
    // Check if there's a work mode section
    if ('work_mode' in sections && sections['work_mode']) {
      const content = sections['work_mode'].toLowerCase();
      for (const mode of this.workModes) {
        if (content.includes(mode)) {
          if (mode === 'work from home') {
            return 'remote';
          }
          return mode;
        }
      }
    }
    
    // Look for work mode in the entire text
    const textLower = text.toLowerCase();
    for (const mode of this.workModes) {
      if (textLower.includes(mode)) {
        // Verify it's not part of another word
        if (new RegExp('\\b' + this.escapeRegExp(mode) + '\\b', 'i').test(textLower)) {
          if (mode === 'work from home') {
            return 'remote';
          }
          return mode;
        }
      }
    }
    
    // Default to on-site if no work mode found
    return "on-site";
  }

  /**
   * Extract job description from the job description text.
   * 
   * @param text Job description text
   * @param sections Dictionary mapping section names to their content
   * @returns Job description
   */
  private extractDescription(text: string, sections: Record<string, string>): string {
    // Check if there's a description section
    if ('description' in sections && sections['description']) {
      return sections['description'];
    }
    
    // If no description section, use the first paragraph
    const paragraphs = text.split(/\n\s*\n/);
    if (paragraphs.length > 0) {
      // Skip potential title/header paragraphs
      for (const paragraph of paragraphs) {
        if (paragraph.length > 100) {  // Assume descriptions are reasonably long
          return paragraph;
        }
      }
    }
    
    return "";
  }

  /**
   * Extract responsibilities from the job description.
   * 
   * @param text Job description text
   * @param sections Dictionary mapping section names to their content
   * @returns List of responsibilities
   */
  private extractResponsibilities(text: string, sections: Record<string, string>): string[] {
    const responsibilities: string[] = [];
    
    // Check if there's a responsibilities section
    if ('responsibilities' in sections && sections['responsibilities']) {
      const content = sections['responsibilities'];
      
      // Extract bullet points
      const bulletPoints = this.extractBulletPoints(content);
      
      if (bulletPoints.length > 0) {
        return bulletPoints;
      } else {
        // If no bullet points, split by sentences
        const sentences = content.split(/(?<=[.!?])\s+/);
        return sentences.filter(s => s.trim()).map(s => s.trim());
      }
    }
    
    return responsibilities;
  }

  /**
   * Extract bullet points from text.
   * 
   * @param text Text containing bullet points
   * @returns List of bullet points
   */
  private extractBulletPoints(text: string): string[] {
    const bulletPoints: string[] = [];
    
    // Split by newlines
    const lines = text.split('\n');
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) {
        continue;
      }
      
      // Check if line starts with a bullet point marker
      if (trimmedLine.startsWith('-') || trimmedLine.startsWith('•') || 
          trimmedLine.startsWith('*') || trimmedLine.startsWith('·')) {
        bulletPoints.push(trimmedLine.replace(/^[-•*·]\s*/, '').trim());
      } else if (/^\d+\./.test(trimmedLine)) {  // Numbered list
        bulletPoints.push(trimmedLine.replace(/^\d+\.\s*/, '').trim());
      }
    }
    
    return bulletPoints;
  }

  /**
   * Extract education requirements from the job description.
   * 
   * @param text Job description text
   * @param sections Dictionary mapping section names to their content
   * @returns List of education requirements
   */
  private extractEducationRequirements(text: string, sections: Record<string, string>): any[] {
    const educationReqs: any[] = [];
    
    // Combine relevant sections
    let content = "";
    for (const sectionName of ['requirements', 'education']) {
      if (sectionName in sections) {
        content += sections[sectionName] + "\n";
      }
    }
    
    if (!content) {
      content = text;
    }
    
    // Look for education level mentions
    for (const level of this.educationLevels) {
      if (new RegExp('\\b' + this.escapeRegExp(level) + '\\b', 'i').test(content)) {
        // Try to find the field of study
        let field = "";
        const fieldMatch = content.match(new RegExp('\\b' + this.escapeRegExp(level) + '(?:\'s)?\\s+(?:degree|diploma)?\\s+in\\s+([^,\\.]+)', 'i'));
        if (fieldMatch && fieldMatch[1]) {
          field = fieldMatch[1].trim();
        }
        
        // Determine if required or preferred
        const required = !(/\b(?:prefer|preferred|nice to have|desirable)\b/i.test(content));
        
        educationReqs.push({
          level,
          field,
          required
        });
      }
    }
    
    return educationReqs;
  }

  /**
   * Extract experience requirements from the job description.
   * 
   * @param text Job description text
   * @param sections Dictionary mapping section names to their content
   * @returns List of experience requirements
   */
  private extractExperienceRequirements(text: string, sections: Record<string, string>): any[] {
    const experienceReqs: any[] = [];
    
    // Combine relevant sections
    let content = "";
    for (const sectionName of ['requirements', 'experience']) {
      if (sectionName in sections) {
        content += sections[sectionName] + "\n";
      }
    }
    
    if (!content) {
      content = text;
    }
    
    // Look for experience patterns
    for (const pattern of this.experiencePatterns) {
      const matches = content.matchAll(pattern);
      
      for (const match of Array.from(matches)) {
        const years = parseInt(match[1]);
        
        // Try to find the field of experience
        let field = "";
        const matchStart = match.index || 0;
        const context = content.substring(Math.max(0, matchStart - 50), Math.min(content.length, matchStart + match[0].length + 50));
        
        const fieldMatch = context.match(/experience\s+in\s+([^,\.]+)/i);
        if (fieldMatch && fieldMatch[1]) {
          field = fieldMatch[1].trim();
        }
        
        // Determine if required or preferred
        const required = !(/\b(?:prefer|preferred|nice to have|desirable)\b/i.test(context));
        
        experienceReqs.push({
          years,
          field,
          required
        });
      }
    }
    
    return experienceReqs;
  }

  /**
   * Extract skills from the job description.
   * 
   * @param text Job description text
   * @param sections Dictionary mapping section names to their content
   * @returns List of skills
   */
  private extractSkills(text: string, sections: Record<string, string>): any[] {
    const skills: any[] = [];
    
    // Combine relevant sections
    let content = "";
    for (const sectionName of ['requirements', 'skills']) {
      if (sectionName in sections) {
        content += sections[sectionName] + "\n";
      }
    }
    
    if (!content) {
      content = text;
    }
    
    // Extract skills using common skills list
    for (const skill of this.commonSkills) {
      const skillRegex = new RegExp('\\b' + this.escapeRegExp(skill) + '\\b', 'i');
      if (skillRegex.test(content)) {
        // Determine if required or preferred
        let required = true;
        const skillContextMatch = content.match(new RegExp('(.{0,50})\\b' + this.escapeRegExp(skill) + '\\b(.{0,50})', 'i'));
        
        if (skillContextMatch && /\b(?:prefer|preferred|nice to have|desirable)\b/i.test(skillContextMatch[0])) {
          required = false;
        }
        
        // Try to determine skill level
        let level = null;
        if (skillContextMatch) {
          const context = skillContextMatch[0].toLowerCase();
          if (/\b(?:expert|advanced|proficient|extensive)\b/.test(context)) {
            level = 'expert';
          } else if (/\b(?:intermediate|competent|familiar)\b/.test(context)) {
            level = 'intermediate';
          } else if (/\b(?:beginner|basic|novice|elementary)\b/.test(context)) {
            level = 'beginner';
          }
        }
        
        skills.push({
          name: skill,
          level,
          required
        });
      }
    }
    
    return skills;
  }

  /**
   * Extract language requirements from the job description.
   * 
   * @param text Job description text
   * @param sections Dictionary mapping section names to their content
   * @returns List of language requirements
   */
  private extractLanguages(text: string, sections: Record<string, string>): any[] {
    const languages: any[] = [];
    
    // Common languages to look for
    const commonLanguages = [
      'English', 'Spanish', 'French', 'German', 'Chinese', 'Mandarin', 'Japanese',
      'Korean', 'Arabic', 'Russian', 'Portuguese', 'Italian', 'Dutch', 'Hindi',
      'Bengali', 'Punjabi', 'Turkish', 'Vietnamese', 'Polish', 'Ukrainian'
    ];
    
    // Combine relevant sections
    let content = "";
    for (const sectionName of ['requirements', 'skills']) {
      if (sectionName in sections) {
        content += sections[sectionName] + "\n";
      }
    }
    
    if (!content) {
      content = text;
    }
    
    // Extract languages
    for (const language of commonLanguages) {
      const langRegex = new RegExp('\\b' + this.escapeRegExp(language) + '\\b', 'i');
      if (langRegex.test(content)) {
        // Determine proficiency level
        let proficiency = 'conversational';  // Default
        
        const langContextMatch = content.match(new RegExp('(.{0,50})\\b' + this.escapeRegExp(language) + '\\b(.{0,50})', 'i'));
        if (langContextMatch) {
          const context = langContextMatch[0].toLowerCase();
          if (/\b(?:native|fluent|proficient|advanced)\b/.test(context)) {
            proficiency = 'fluent';
          } else if (/\b(?:intermediate|conversational|working)\b/.test(context)) {
            proficiency = 'conversational';
          } else if (/\b(?:basic|beginner|elementary)\b/.test(context)) {
            proficiency = 'basic';
          }
        }
        
        // Determine if required or preferred
        const required = !(langContextMatch && /\b(?:prefer|preferred|nice to have|desirable)\b/i.test(langContextMatch[0]));
        
        languages.push({
          name: language,
          proficiency,
          required
        });
      }
    }
    
    return languages;
  }

  /**
   * Extract certification requirements from the job description.
   * 
   * @param text Job description text
   * @param sections Dictionary mapping section names to their content
   * @returns List of certification requirements
   */
  private extractCertifications(text: string, sections: Record<string, string>): any[] {
    const certifications: any[] = [];
    
    // Common certification keywords
    const certKeywords = [
      'certification', 'certificate', 'certified', 'license', 'licensed',
      'PMP', 'CISSP', 'CPA', 'AWS', 'Azure', 'Google Cloud', 'Scrum', 'ITIL',
      'Six Sigma', 'CCNA', 'MCSA', 'CompTIA', 'CISA', 'CISM'
    ];
    
    // Combine relevant sections
    let content = "";
    for (const sectionName of ['requirements', 'certifications']) {
      if (sectionName in sections) {
        content += sections[sectionName] + "\n";
      }
    }
    
    if (!content) {
      content = text;
    }
    
    // Extract certifications
    for (const keyword of certKeywords) {
      const matches = Array.from(content.matchAll(new RegExp('\\b' + this.escapeRegExp(keyword) + '(?:\\s+in)?\\s+([^,\\.]+)', 'gi')));
      
      for (const match of matches) {
        const certName = match[0].trim();
        
        // Determine if required or preferred
        let required = true;
        const certContextMatch = content.match(new RegExp('(.{0,50})\\b' + this.escapeRegExp(certName) + '\\b(.{0,50})', 'i'));
        
        if (certContextMatch && /\b(?:prefer|preferred|nice to have|desirable)\b/i.test(certContextMatch[0])) {
          required = false;
        }
        
        certifications.push({
          name: certName,
          required
        });
      }
    }
    
    return certifications;
  }

  /**
   * Extract benefits from the job description.
   * 
   * @param text Job description text
   * @param sections Dictionary mapping section names to their content
   * @returns List of benefits
   */
  private extractBenefits(text: string, sections: Record<string, string>): string[] {
    const benefits: string[] = [];
    
    // Check if there's a benefits section
    if ('benefits' in sections && sections['benefits']) {
      const content = sections['benefits'];
      
      // Extract bullet points
      const bulletPoints = this.extractBulletPoints(content);
      
      if (bulletPoints.length > 0) {
        return bulletPoints;
      } else {
        // If no bullet points, split by sentences
        const sentences = content.split(/(?<=[.!?])\s+/);
        return sentences.filter(s => s.trim()).map(s => s.trim());
      }
    }
    
    return benefits;
  }

  /**
   * Extract salary information from the job description.
   * 
   * @param text Job description text
   * @param sections Dictionary mapping section names to their content
   * @returns Dictionary containing salary information
   */
  private extractSalary(text: string, sections: Record<string, string>): Record<string, any> {
    const salaryInfo: Record<string, any> = {};
    
    // Combine relevant sections
    let content = "";
    for (const sectionName of ['salary', 'benefits', 'compensation']) {
      if (sectionName in sections) {
        content += sections[sectionName] + "\n";
      }
    }
    
    if (!content) {
      content = text;
    }
    
    // Extract salary information
    for (const pattern of this.salaryPatterns) {
      const match = content.match(pattern);
      if (match) {
        if (match.length >= 3) {
          // Salary range
          const minSalary = this.parseSalaryAmount(match[1]);
          const maxSalary = this.parseSalaryAmount(match[2]);
          
          if (minSalary) {
            salaryInfo['min'] = minSalary;
          }
          if (maxSalary) {
            salaryInfo['max'] = maxSalary;
          }
        } else if (match.length >= 2) {
          // Single salary figure
          const amount = this.parseSalaryAmount(match[1]);
          if (amount) {
            if (match[0].toLowerCase().includes('up to') || match[0].toLowerCase().includes('maximum')) {
              salaryInfo['max'] = amount;
            } else if (match[0].toLowerCase().includes('starting at') || match[0].toLowerCase().includes('minimum')) {
              salaryInfo['min'] = amount;
            } else {
              salaryInfo['min'] = amount;
              salaryInfo['max'] = amount;
            }
          }
        }
        
        // Extract currency
        const currencyMatch = match[0].match(/(\$|€|£|¥)/);
        if (currencyMatch) {
          switch (currencyMatch[1]) {
            case '$':
              salaryInfo['currency'] = 'USD';
              break;
            case '€':
              salaryInfo['currency'] = 'EUR';
              break;
            case '£':
              salaryInfo['currency'] = 'GBP';
              break;
            case '¥':
              salaryInfo['currency'] = 'JPY';
              break;
          }
        }
        
        // Extract period
        const periodMatch = match[0].match(/per\s+(hour|year|month|week)/i);
        if (periodMatch) {
          const period = periodMatch[1].toLowerCase();
          switch (period) {
            case 'hour':
              salaryInfo['period'] = 'hourly';
              break;
            case 'year':
              salaryInfo['period'] = 'annual';
              break;
            case 'month':
              salaryInfo['period'] = 'monthly';
              break;
            case 'week':
              salaryInfo['period'] = 'weekly';
              break;
          }
        }
        
        break;
      }
    }
    
    return salaryInfo;
  }

  /**
   * Parse salary amount from string.
   * 
   * @param amountStr String containing salary amount
   * @returns Parsed salary amount as integer
   */
  private parseSalaryAmount(amountStr: string): number | null {
    try {
      // Remove currency symbols and commas
      const cleaned = amountStr.replace(/[^\d.]/g, '');
      
      // Check if it's in thousands (e.g., 50k)
      if (amountStr.toLowerCase().includes('k')) {
        return Math.round(parseFloat(cleaned) * 1000);
      }
      
      return Math.round(parseFloat(cleaned));
    } catch {
      return null;
    }
  }

  /**
   * Extract application deadline from the job description.
   * 
   * @param text Job description text
   * @param sections Dictionary mapping section names to their content
   * @returns Application deadline
   */
  private extractDeadline(text: string, sections: Record<string, string>): string {
    // Check if there's a deadline section
    if ('deadline' in sections && sections['deadline']) {
      const content = sections['deadline'];
      
      // Look for dates in the deadline section
      for (const pattern of this.datePatterns) {
        const match = content.match(pattern);
        if (match) {
          return match[0];
        }
      }
    }
    
    // Look for deadline in the entire text
    const deadlinePatterns = [
      /(?i)deadline[:\s]+([^\n,]+)/,
      /(?i)apply\s+by[:\s]+([^\n,]+)/,
      /(?i)closing\s+date[:\s]+([^\n,]+)/,
    ];
    
    for (const pattern of deadlinePatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        // Check if the captured group contains a date
        for (const datePattern of this.datePatterns) {
          const dateMatch = match[1].match(datePattern);
          if (dateMatch) {
            return dateMatch[0];
          }
        }
        
        // If no date pattern found, return the captured text
        return match[1].trim();
      }
    }
    
    return "";
  }

  /**
   * Extract posted date from the job description.
   * 
   * @param text Job description text
   * @returns Posted date
   */
  private extractPostedDate(text: string): string {
    const postedPatterns = [
      /(?i)posted[:\s]+([^\n,]+)/,
      /(?i)date\s+posted[:\s]+([^\n,]+)/,
      /(?i)published[:\s]+([^\n,]+)/,
    ];
    
    for (const pattern of postedPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        // Check if the captured group contains a date
        for (const datePattern of this.datePatterns) {
          const dateMatch = match[1].match(datePattern);
          if (dateMatch) {
            return dateMatch[0];
          }
        }
        
        // If no date pattern found, return the captured text
        return match[1].trim();
      }
    }
    
    // If no posted date found, look for any date in the first few lines
    const lines = text.split('\n');
    const firstFewLines = lines.slice(0, 10).join('\n');
    
    for (const datePattern of this.datePatterns) {
      const match = firstFewLines.match(datePattern);
      if (match) {
        return match[0];
      }
    }
    
    return "";
  }

  /**
   * Extract keywords from the job description.
   * 
   * @param text Job description text
   * @returns List of keywords
   */
  private extractKeywords(text: string): string[] {
    const keywords: string[] = [];
    
    // Extract skills as keywords
    for (const skill of this.commonSkills) {
      if (new RegExp('\\b' + this.escapeRegExp(skill) + '\\b', 'i').test(text)) {
        keywords.push(skill);
      }
    }
    
    // Extract common job-related terms (simplified implementation)
    const commonTerms = [
      'team', 'project', 'management', 'development', 'design', 'analysis',
      'research', 'customer', 'client', 'product', 'service', 'solution',
      'strategy', 'innovation', 'growth', 'market', 'business', 'sales'
    ];
    
    for (const term of commonTerms) {
      if (new RegExp('\\b' + this.escapeRegExp(term) + '\\b', 'i').test(text) && 
          !keywords.includes(term)) {
        keywords.push(term);
      }
    }
    
    // Limit to top 20 keywords
    return keywords.slice(0, 20);
  }

  /**
   * Escape special characters in a string for use in a regular expression.
   * 
   * @param string String to escape
   * @returns Escaped string
   */
  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

// Example usage
if (typeof window !== 'undefined') {
  (window as any).JobDescriptionParser = JobDescriptionParser;
}

// Export the parser class
export default JobDescriptionParser;
