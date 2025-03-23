
/**
 * Job Description Parser for Supabase Edge Function
 * 
 * A TypeScript implementation of the Job Description Parser
 */

export interface JobDescription {
  title: string;
  company: string;
  location: string;
  employmentType: string;
  workMode: string;
  description: string;
  responsibilities: string[];
  requirements: {
    education: EducationRequirement[];
    experience: ExperienceRequirement[];
    skills: SkillRequirement[];
    languages: LanguageRequirement[];
    certifications: CertificationRequirement[];
  };
  benefits: string[];
  salary: SalaryInfo;
  applicationDeadline: string;
  postedDate: string;
  keywords: string[];
}

interface EducationRequirement {
  level: string;
  field: string;
  required: boolean;
}

interface ExperienceRequirement {
  years: number;
  field: string;
  required: boolean;
}

interface SkillRequirement {
  name: string;
  level: string | null;
  required: boolean;
}

interface LanguageRequirement {
  name: string;
  proficiency: string;
  required: boolean;
}

interface CertificationRequirement {
  name: string;
  required: boolean;
}

interface SalaryInfo {
  min?: number;
  max?: number;
  currency?: string;
  period?: string;
}

export class JobDescriptionParser {
  // Section patterns for identifying different parts of a job description
  private sectionPatterns: Record<string, RegExp> = {
    title: /(job\s+title|position|role)/i,
    company: /(company|organization|employer)/i,
    location: /(location|place|city|region|country)/i,
    employment_type: /(employment\s+type|job\s+type|contract\s+type)/i,
    work_mode: /(work\s+mode|remote|on-site|hybrid)/i,
    description: /(job\s+description|about\s+the\s+job|about\s+the\s+role|overview)/i,
    responsibilities: /(responsibilities|duties|key\s+responsibilities|what\s+you\'ll\s+do)/i,
    requirements: /(requirements|qualifications|what\s+you\s+need|what\s+we\'re\s+looking\s+for)/i,
    education: /(education|academic|qualifications|degree)/i,
    experience: /(experience|work\s+experience|professional\s+experience)/i,
    skills: /(skills|technical\s+skills|competencies|expertise)/i,
    benefits: /(benefits|perks|what\s+we\s+offer|compensation)/i,
    salary: /(salary|compensation|pay|wage)/i,
    application: /(how\s+to\s+apply|application\s+process|next\s+steps)/i,
    deadline: /(deadline|closing\s+date|apply\s+by)/i
  };

  // Employment type patterns
  private employmentTypes: string[] = [
    'full-time', 'part-time', 'contract', 'temporary', 'internship',
    'freelance', 'permanent', 'casual', 'seasonal'
  ];

  // Work mode patterns
  private workModes: string[] = [
    'remote', 'on-site', 'hybrid', 'flexible', 'work from home'
  ];

  // Common skills list
  private commonSkills: string[] = [
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
    'Time Management', 'Project Management', 'Customer Service', 'Negotiation'
  ];

  // Education level patterns
  private educationLevels: string[] = [
    'high school', 'associate', 'bachelor', 'master', 'phd', 'doctorate', 'mba',
    'undergraduate', 'graduate', 'postgraduate', 'diploma', 'certificate'
  ];

  // Experience patterns
  private experiencePatterns: RegExp[] = [
    /(\d+)\+?\s+years?/i,
    /minimum\s+of\s+(\d+)\s+years?/i,
    /at\s+least\s+(\d+)\s+years?/i,
    /(\d+)-(\d+)\s+years?/i
  ];

  // Salary patterns
  private salaryPatterns: RegExp[] = [
    /(\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*-\s*(\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/i,
    /(\d{1,3}(?:,\d{3})*(?:\.\d{2})?k)\s*-\s*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?k)/i,
    /up\s+to\s+(\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/i,
    /starting\s+at\s+(\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/i,
    /(\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s+per\s+(hour|year|month|week)/i
  ];

  // Date patterns
  private datePatterns: RegExp[] = [
    /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2},? \d{4}\b/i,
    /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/i,
    /\b\d{4}-\d{1,2}-\d{1,2}\b/i
  ];

  /**
   * Parse a job description and extract structured information
   */
  public parseJobDescription(text: string): JobDescription {
    // Clean and normalize text
    text = this.cleanText(text);
    
    // Identify sections
    const sections = this.identifySections(text);
    
    // Extract basic job information
    const jobData: JobDescription = {
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
   * Clean and normalize the job description text
   */
  private cleanText(text: string): string {
    if (!text) {
      return "";
    }
    
    // Replace multiple newlines with a single newline
    text = text.replace(/\n\s*\n/g, '\n\n');
    
    // Replace multiple spaces with a single space
    text = text.replace(/ +/g, ' ');
    
    // Remove non-printable characters (simplified for JS)
    text = text.replace(/[^\x20-\x7E\n]/g, '');
    
    return text.trim();
  }

  /**
   * Identify and extract sections from the job description
   */
  private identifySections(text: string): Record<string, string> {
    const sections: Record<string, string> = {};
    
    // Split text into lines
    const lines = text.split('\n');
    
    // Find potential section headers
    const sectionBoundaries: [number, string][] = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) {
        continue;
      }
      
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
      const endIdx = i < sectionBoundaries.length - 1 
        ? sectionBoundaries[i + 1][0] 
        : lines.length;
      
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
   * Extract job title from the job description
   */
  private extractJobTitle(text: string, sections: Record<string, string>): string {
    // Check if there's a title section
    if (sections['title'] && sections['title']) {
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
   * Extract company name from the job description
   */
  private extractCompany(text: string, sections: Record<string, string>): string {
    // Check if there's a company section
    if (sections['company'] && sections['company']) {
      return sections['company'].split('\n')[0].trim();
    }
    
    // Look for company patterns
    const companyPatterns = [
      /(?:at|with|for|by)\s+([A-Z][A-Za-z0-9\s&]+)(?:,|\.|is)/i,
      /Company\s*:\s*([^,\n]+)/i,
      /([A-Z][A-Za-z0-9\s&]+)\s+is\s+(?:seeking|looking|hiring)/i
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
   * Extract location from the job description
   */
  private extractLocation(text: string, sections: Record<string, string>): string {
    // Check if there's a location section
    if (sections['location'] && sections['location']) {
      return sections['location'].split('\n')[0].trim();
    }
    
    // Look for common location patterns
    const locationPatterns = [
      /Location\s*:\s*([^,\n]+)/i,
      /(?:in|at|near)\s+([A-Z][A-Za-z\s]+,\s*[A-Z]{2})/i,
      /([A-Z][A-Za-z\s]+,\s*[A-Z]{2})/i,
      /based\s+in\s+([^,\n]+)/i,
      /position\s+in\s+([^,\n]+)/i
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
   * Extract employment type from the job description
   */
  private extractEmploymentType(text: string, sections: Record<string, string>): string {
    // Check if there's an employment type section
    if (sections['employment_type'] && sections['employment_type']) {
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
        const regex = new RegExp('\\b' + empType + '\\b', 'i');
        if (regex.test(textLower)) {
          return empType;
        }
      }
    }
    
    // Default to full-time if no employment type found
    return "full-time";
  }

  /**
   * Extract work mode from the job description
   */
  private extractWorkMode(text: string, sections: Record<string, string>): string {
    // Check if there's a work mode section
    if (sections['work_mode'] && sections['work_mode']) {
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
        const regex = new RegExp('\\b' + mode + '\\b', 'i');
        if (regex.test(textLower)) {
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
   * Extract job description from the job description text
   */
  private extractDescription(text: string, sections: Record<string, string>): string {
    // Check if there's a description section
    if (sections['description'] && sections['description']) {
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
   * Extract responsibilities from the job description
   */
  private extractResponsibilities(text: string, sections: Record<string, string>): string[] {
    const responsibilities: string[] = [];
    
    // Check if there's a responsibilities section
    if (sections['responsibilities'] && sections['responsibilities']) {
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
   * Extract bullet points from text
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
   * Extract education requirements from the job description
   */
  private extractEducationRequirements(text: string, sections: Record<string, string>): EducationRequirement[] {
    const educationReqs: EducationRequirement[] = [];
    
    // Combine relevant sections
    let content = "";
    for (const sectionName of ['requirements', 'education']) {
      if (sections[sectionName]) {
        content += sections[sectionName] + "\n";
      }
    }
    
    if (!content) {
      content = text;
    }
    
    // Look for education level mentions
    for (const level of this.educationLevels) {
      const regex = new RegExp('\\b' + level + '\\b', 'i');
      if (regex.test(content)) {
        // Try to find the field of study
        let field = "";
        const fieldRegex = new RegExp('\\b' + level + '(?:\'s)?\\s+(?:degree|diploma)?\\s+in\\s+([^,\\.]+)', 'i');
        const fieldMatch = content.match(fieldRegex);
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
   * Extract experience requirements from the job description
   */
  private extractExperienceRequirements(text: string, sections: Record<string, string>): ExperienceRequirement[] {
    const experienceReqs: ExperienceRequirement[] = [];
    
    // Combine relevant sections
    let content = "";
    for (const sectionName of ['requirements', 'experience']) {
      if (sections[sectionName]) {
        content += sections[sectionName] + "\n";
      }
    }
    
    if (!content) {
      content = text;
    }
    
    // Look for experience patterns
    for (const pattern of this.experiencePatterns) {
      const matches = content.match(pattern);
      if (matches && matches.length > 1) {
        for (let i = 0; i < matches.length; i++) {
          const match = matches[i];
          const yearMatch = match.match(/\d+/);
          if (yearMatch) {
            const years = parseInt(yearMatch[0], 10);
          
            // Try to find the field of experience
            let field = "";
            const contextStart = Math.max(0, content.indexOf(match) - 50);
            const contextEnd = Math.min(content.length, content.indexOf(match) + match.length + 50);
            const context = content.substring(contextStart, contextEnd);
            
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
      }
    }
    
    return experienceReqs;
  }

  /**
   * Extract skills from the job description
   */
  private extractSkills(text: string, sections: Record<string, string>): SkillRequirement[] {
    const skills: SkillRequirement[] = [];
    
    // Combine relevant sections
    let content = "";
    for (const sectionName of ['requirements', 'skills']) {
      if (sections[sectionName]) {
        content += sections[sectionName] + "\n";
      }
    }
    
    if (!content) {
      content = text;
    }
    
    // Extract skills using common skills list
    for (const skill of this.commonSkills) {
      const regex = new RegExp('\\b' + skill + '\\b', 'i');
      if (regex.test(content)) {
        // Determine if required or preferred
        let required = true;
        const skillRegex = new RegExp('(.{0,50})\\b' + skill + '\\b(.{0,50})', 'i');
        const skillContext = content.match(skillRegex);
        if (skillContext && /\b(?:prefer|preferred|nice to have|desirable)\b/i.test(skillContext[0])) {
          required = false;
        }
        
        // Try to determine skill level
        let level: string | null = null;
        if (skillContext) {
          const context = skillContext[0].toLowerCase();
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
   * Extract language requirements from the job description
   */
  private extractLanguages(text: string, sections: Record<string, string>): LanguageRequirement[] {
    const languages: LanguageRequirement[] = [];
    
    // Common languages to look for
    const commonLanguages = [
      'English', 'Spanish', 'French', 'German', 'Chinese', 'Mandarin', 'Japanese',
      'Korean', 'Arabic', 'Russian', 'Portuguese', 'Italian', 'Dutch', 'Hindi',
      'Bengali', 'Punjabi', 'Turkish', 'Vietnamese', 'Polish', 'Ukrainian'
    ];
    
    // Combine relevant sections
    let content = "";
    for (const sectionName of ['requirements', 'skills']) {
      if (sections[sectionName]) {
        content += sections[sectionName] + "\n";
      }
    }
    
    if (!content) {
      content = text;
    }
    
    // Extract languages
    for (const language of commonLanguages) {
      const regex = new RegExp('\\b' + language + '\\b', 'i');
      if (regex.test(content)) {
        // Determine proficiency level
        let proficiency = 'conversational';  // Default
        
        const languageRegex = new RegExp('(.{0,50})\\b' + language + '\\b(.{0,50})', 'i');
        const languageContext = content.match(languageRegex);
        if (languageContext) {
          const context = languageContext[0].toLowerCase();
          if (/\b(?:native|fluent|proficient|advanced)\b/.test(context)) {
            proficiency = 'fluent';
          } else if (/\b(?:intermediate|conversational|working)\b/.test(context)) {
            proficiency = 'conversational';
          } else if (/\b(?:basic|beginner|elementary)\b/.test(context)) {
            proficiency = 'basic';
          }
        }
        
        // Determine if required or preferred
        let required = true;
        if (languageContext && /\b(?:prefer|preferred|nice to have|desirable)\b/i.test(languageContext[0])) {
          required = false;
        }
        
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
   * Extract certification requirements from the job description
   */
  private extractCertifications(text: string, sections: Record<string, string>): CertificationRequirement[] {
    const certifications: CertificationRequirement[] = [];
    
    // Common certification keywords
    const certKeywords = [
      'certification', 'certificate', 'certified', 'license', 'licensed',
      'PMP', 'CISSP', 'CPA', 'AWS', 'Azure', 'Google Cloud', 'Scrum', 'ITIL',
      'Six Sigma', 'CCNA', 'MCSA', 'CompTIA', 'CISA', 'CISM'
    ];
    
    // Combine relevant sections
    let content = "";
    for (const sectionName of ['requirements', 'certifications']) {
      if (sections[sectionName]) {
        content += sections[sectionName] + "\n";
      }
    }
    
    if (!content) {
      content = text;
    }
    
    // Extract certifications
    for (const keyword of certKeywords) {
      const regex = new RegExp('\\b' + keyword + '(?:\\s+in)?\\s+([^,\\.]+)', 'i');
      const matches = content.match(regex);
      
      if (matches) {
        const certName = matches[0].trim();
        
        // Determine if required or preferred
        let required = true;
        const certRegex = new RegExp('(.{0,50})\\b' + certName + '\\b(.{0,50})', 'i');
        const certContext = content.match(certRegex);
        if (certContext && /\b(?:prefer|preferred|nice to have|desirable)\b/i.test(certContext[0])) {
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
   * Extract benefits from the job description
   */
  private extractBenefits(text: string, sections: Record<string, string>): string[] {
    const benefits: string[] = [];
    
    // Check if there's a benefits section
    if (sections['benefits'] && sections['benefits']) {
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
   * Extract salary information from the job description
   */
  private extractSalary(text: string, sections: Record<string, string>): SalaryInfo {
    const salaryInfo: SalaryInfo = {};
    
    // Combine relevant sections
    let content = "";
    for (const sectionName of ['salary', 'benefits', 'compensation']) {
      if (sections[sectionName]) {
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
          
          if (minSalary !== null) {
            salaryInfo.min = minSalary;
          }
          if (maxSalary !== null) {
            salaryInfo.max = maxSalary;
          }
        } else if (match.length >= 2) {
          // Single salary figure
          const amount = this.parseSalaryAmount(match[1]);
          if (amount !== null) {
            if (/up to|maximum/i.test(match[0])) {
              salaryInfo.max = amount;
            } else if (/starting at|minimum/i.test(match[0])) {
              salaryInfo.min = amount;
            } else {
              salaryInfo.min = amount;
              salaryInfo.max = amount;
            }
          }
        }
        
        // Extract currency
        const currencyMatch = match[0].match(/(\$|€|£|¥)/);
        if (currencyMatch) {
          if (currencyMatch[1] === '$') {
            salaryInfo.currency = 'USD';
          } else if (currencyMatch[1] === '€') {
            salaryInfo.currency = 'EUR';
          } else if (currencyMatch[1] === '£') {
            salaryInfo.currency = 'GBP';
          } else if (currencyMatch[1] === '¥') {
            salaryInfo.currency = 'JPY';
          }
        }
        
        // Extract period
        const periodMatch = match[0].match(/per\s+(hour|year|month|week)/i);
        if (periodMatch) {
          const period = periodMatch[1].toLowerCase();
          if (period === 'hour') {
            salaryInfo.period = 'hourly';
          } else if (period === 'year') {
            salaryInfo.period = 'annual';
          } else if (period === 'month') {
            salaryInfo.period = 'monthly';
          } else if (period === 'week') {
            salaryInfo.period = 'weekly';
          }
        }
        
        break;
      }
    }
    
    return salaryInfo;
  }

  /**
   * Parse salary amount from string
   */
  private parseSalaryAmount(amountStr: string): number | null {
    try {
      // Remove currency symbols and commas
      const cleaned = amountStr.replace(/[^\d.]/g, '');
      
      // Check if it's in thousands (e.g., 50k)
      if (/k/i.test(amountStr)) {
        return Math.round(parseFloat(cleaned) * 1000);
      }
      
      return Math.round(parseFloat(cleaned));
    } catch {
      return null;
    }
  }

  /**
   * Extract application deadline from the job description
   */
  private extractDeadline(text: string, sections: Record<string, string>): string {
    // Check if there's a deadline section
    if (sections['deadline'] && sections['deadline']) {
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
      /(?:deadline[:\s]+)([^\n,]+)/i,
      /(?:apply\s+by[:\s]+)([^\n,]+)/i,
      /(?:closing\s+date[:\s]+)([^\n,]+)/i
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
   * Extract posted date from the job description
   */
  private extractPostedDate(text: string): string {
    const postedPatterns = [
      /(?:posted[:\s]+)([^\n,]+)/i,
      /(?:date\s+posted[:\s]+)([^\n,]+)/i,
      /(?:published[:\s]+)([^\n,]+)/i
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
   * Extract keywords from the job description
   */
  private extractKeywords(text: string): string[] {
    const keywords: string[] = [];
    
    // Extract skills as keywords
    for (const skill of this.commonSkills) {
      const regex = new RegExp('\\b' + skill + '\\b', 'i');
      if (regex.test(text)) {
        keywords.push(skill);
      }
    }
    
    // Extract common job-related terms
    const jobTerms = [
      'experience', 'skills', 'required', 'responsibilities', 'duties',
      'qualifications', 'education', 'degree', 'salary', 'benefits'
    ];
    
    for (const term of jobTerms) {
      if (!keywords.includes(term)) {
        keywords.push(term);
      }
    }
    
    // Limit to top 20 keywords
    return keywords.slice(0, 20);
  }
}
