
// Camp image mapping based on category and subcategories
export const campImages = {
  'Technology': {
    default: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b', // Laptop
    'Coding': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085', // Code on screen
    'Robotics': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e', // Robot
    'Game Development': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5' // Gaming setup
  },
  'Science': {
    default: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d', // Science lab
    'Chemistry': 'https://images.unsplash.com/photo-1617791160536-598cf32026fb', // Chemistry lab
    'Biology': 'https://images.unsplash.com/photo-1576086213369-97a306d36557', // Biology specimens
    'Physics': 'https://images.unsplash.com/photo-1636466497217-06a74db567f7' // Physics equipment
  },
  'Arts': {
    default: 'https://images.unsplash.com/photo-1500673922987-e212871fec22', // Yellow lights, artistic
    'Visual Arts': 'https://images.unsplash.com/photo-1513364776144-60967b0f800f', // Art supplies
    'Performing Arts': 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad', // Theater stage
    'Music': 'https://images.unsplash.com/photo-1511379938547-c1f69419868d' // Music instruments
  },
  'Leadership': {
    default: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e', // Mountain landscape
    'Public Speaking': 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2', // Speaking podium
    'Entrepreneurship': 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a', // Business meeting
    'Team Building': 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca' // Team activity
  },
  'Sports': {
    default: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3', // Mountain with grass
    'Soccer': 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55', // Soccer field
    'Swimming': 'https://images.unsplash.com/photo-1576013551627-0ae7d1d192c7', // Swimming pool
    'Basketball': 'https://images.unsplash.com/photo-1546519638-68e109498ffc' // Basketball court
  },
  'default': 'https://images.unsplash.com/photo-1501854140801-50d01698950b' // Bird's eye view of green mountains
};

// Helper function to get the best image for a camp based on category and content
export const getCampImage = (camp: {
  category?: string;
  title: string;
  description: string;
  image_url?: string;
}): string => {
  // Use image_url if provided
  if (camp.image_url) return camp.image_url;
  
  // First check if the category exists
  if (!camp.category || !campImages[camp.category as keyof typeof campImages]) {
    return campImages.default;
  }
  
  const categoryImages = campImages[camp.category as keyof typeof campImages];
  
  // If the category exists but is just a string (not an object with subcategories)
  if (typeof categoryImages === 'string') {
    return categoryImages;
  }
  
  // Look for keywords in the title and description to determine the best subcategory image
  const content = (camp.title + ' ' + camp.description).toLowerCase();
  
  // Check for specific subcategory keywords
  for (const [subCategory, imageUrl] of Object.entries(categoryImages)) {
    if (subCategory !== 'default' && content.includes(subCategory.toLowerCase())) {
      return imageUrl;
    }
  }
  
  // Fall back to the default image for this category
  return categoryImages.default || campImages.default;
};
