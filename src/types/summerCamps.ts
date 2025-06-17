
export interface SummerCamp {
  id: string;
  title: string;
  organizer: string;
  description: string;
  category: string;
  age_group: string;
  start_date: string;
  end_date: string;
  duration: string;
  location: string;
  capacity: number;
  enrolled: number;
  price: number;
  image_url: string;
  tags: string[];
  rating: number;
  created_at: string;
  updated_at: string | null;
  created_by?: string;
  max_participants?: number;
  registration_deadline?: string;
}

export interface CampEnrollment {
  id: string;
  camp_id: string;
  user_id: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'refunded';
  enrolled_at: string;
  updated_at: string | null;
  camp: SummerCamp;
}

export interface CampFilters {
  category?: string[];
  ageGroup?: string[];
  searchQuery?: string;
  location?: string[];
  priceRange?: [number, number];
  dateRange?: [string, string];
}
