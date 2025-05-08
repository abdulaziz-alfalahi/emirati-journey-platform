
// Camp image mapping based on category and subcategories
export const campImages = {
  'Aviation Technology': {
    default: 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&w=800&q=60', // Drone
    'Coding': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=60', // Tech equipment
    'Robotics': 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=800&q=60', // Glass building from below
    'Game Development': 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=800&q=60' // Architecture
  },
  'Aerospace Engineering': {
    default: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=60', // Science lab
    'Chemistry': 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=800&q=60', // Building angles
    'Biology': 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&w=800&q=60', // Drone
    'Physics': 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=800&q=60' // Building from below
  },
  'Aviation Design': {
    default: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=800&q=60', // Building angles
    'Visual Arts': 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=800&q=60', // Architecture
    'Performing Arts': 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&w=800&q=60', // Drone
    'Music': 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=800&q=60' // Building from below
  },
  'Flight Operations': {
    default: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=800&q=60', // Architecture
    'Public Speaking': 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=800&q=60', // Building from below
    'Entrepreneurship': 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=800&q=60', // Building angles
    'Team Building': 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&w=800&q=60' // Drone
  },
  'Flight Simulation': {
    default: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=800&q=60', // Building from below
    'Soccer': 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&w=800&q=60', // Drone
    'Swimming': 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=800&q=60', // Architecture
    'Basketball': 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=800&q=60' // Building angles
  },
  'Technology': {
    default: 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&w=800&q=60', // Drone
  },
  'Science': {
    default: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=60', // Science lab
  },
  'Arts': {
    default: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=800&q=60', // Architecture
  },
  'Leadership': {
    default: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=800&q=60', // Building from below
  },
  'Sports': {
    default: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=800&q=60', // Building angles
  },
  'default': 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&w=800&q=60' // Drone
};

// Helper function to get the best image for a camp based on category and content
export const getCampImage = (camp: {
  category?: string;
  title: string;
  description: string;
  image_url?: string;
}): string => {
  // Use image_url if provided and it's a valid URL
  if (camp.image_url && isValidImageUrl(camp.image_url)) {
    return appendImageParameters(camp.image_url);
  }
  
  // First check if the category exists
  if (!camp.category || !campImages[camp.category as keyof typeof campImages]) {
    return appendImageParameters(campImages.default);
  }
  
  const categoryImages = campImages[camp.category as keyof typeof campImages];
  
  // If the category exists but is just a string (not an object with subcategories)
  if (typeof categoryImages === 'string') {
    return appendImageParameters(categoryImages);
  }
  
  // Look for keywords in the title and description to determine the best subcategory image
  const content = (camp.title + ' ' + camp.description).toLowerCase();
  
  // Check for specific subcategory keywords
  for (const [subCategory, imageUrl] of Object.entries(categoryImages)) {
    if (subCategory !== 'default' && content.includes(subCategory.toLowerCase())) {
      return appendImageParameters(imageUrl as string);
    }
  }
  
  // Fall back to the default image for this category
  return appendImageParameters((categoryImages.default || campImages.default) as string);
};

// Helper function to check if a URL is likely a valid image URL
function isValidImageUrl(url: string): boolean {
  // Basic URL validation
  try {
    const parsedUrl = new URL(url);
    return true;
  } catch (e) {
    console.error("Invalid URL:", url);
    return false;
  }
}

// Add necessary parameters to optimize image loading
function appendImageParameters(url: string): string {
  // Check if the URL is from Unsplash and doesn't already have parameters
  if (url.includes('unsplash.com') && !url.includes('?')) {
    return `${url}?auto=format&fit=crop&w=800&q=60`;
  }
  return url;
}
