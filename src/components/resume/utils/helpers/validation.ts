
export const validateFileSize = (fileSize: number, maxSizeInBytes: number): { isValid: boolean; maxSizeInMB: number } => {
  const maxSizeInMB = maxSizeInBytes / (1024 * 1024);
  const isValid = fileSize <= maxSizeInBytes;
  return { isValid, maxSizeInMB };
};

export const isEmptyResumeData = (data: any): boolean => {
  if (!data) return true;

  // Check for empty personal information
  if (data.personal) {
    const personalInfo = data.personal;
    if (!personalInfo.fullName && !personalInfo.email && !personalInfo.phone) {
      return true;
    }
  }

  // Check for empty experience and education
  if ((!data.experience || data.experience.length === 0) &&
      (!data.education || data.education.length === 0)) {
    return true;
  }

  return false;
};

export const sanitizeResumeData = (data: any): any => {
  if (!data) return data;

  const removePDFArtifacts = (text: string): string => {
    if (typeof text !== 'string') return text;
    return text.replace(/[^\x20-\x7E\n]+/g, '');
  };

  // Sanitize personal information
  if (data.personal) {
    for (const key in data.personal) {
      if (typeof data.personal[key] === 'string') {
        data.personal[key] = removePDFArtifacts(data.personal[key]);
      }
    }
  }

  // Sanitize summary
  if (data.summary && typeof data.summary === 'string') {
    data.summary = removePDFArtifacts(data.summary);
  }

  // Sanitize experience
  if (data.experience && Array.isArray(data.experience)) {
    data.experience.forEach((exp: any) => {
      if (exp && typeof exp === 'object') {
        for (const key in exp) {
          if (typeof exp[key] === 'string') {
            exp[key] = removePDFArtifacts(exp[key]);
          }
        }
      }
    });
  }

  // Sanitize education
  if (data.education && Array.isArray(data.education)) {
    data.education.forEach((edu: any) => {
      if (edu && typeof edu === 'object') {
        for (const key in edu) {
          if (typeof edu[key] === 'string') {
            edu[key] = removePDFArtifacts(edu[key]);
          }
        }
      }
    });
  }

  // Sanitize skills
  if (data.skills && Array.isArray(data.skills)) {
    data.skills = data.skills.map(skill => typeof skill === 'string' ? removePDFArtifacts(skill) : skill);
  }

    // Sanitize languages
    if (data.languages && Array.isArray(data.languages)) {
      data.languages = data.languages.map(language => typeof language === 'string' ? removePDFArtifacts(language) : language);
    }

  return data;
};

// Add proper type checking before using string methods
export const validateResumeImageType = (fileType: string | undefined): {
  isUnsupported: boolean;
  supportedTypes: string[];
} => {
  const supportedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  
  // Check if fileType is undefined, null, or empty string
  if (!fileType || typeof fileType !== 'string') {
    return {
      isUnsupported: true,
      supportedTypes,
    };
  }
  
  // Now we know fileType is a string, it's safe to call trim()
  const trimmedType = fileType.trim().toLowerCase();
  
  return {
    isUnsupported: !supportedTypes.includes(trimmedType),
    supportedTypes,
  };
};
