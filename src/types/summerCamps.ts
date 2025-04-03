
export type SummerCamp = {
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
  created_at: string;
  updated_at: string | null;
  created_by?: string;
};

export type CampEnrollment = {
  id: string;
  camp_id: string;
  user_id: string;
  status: 'confirmed' | 'cancelled' | 'waiting_list';
  payment_status: 'pending' | 'paid' | 'refunded';
  enrolled_at: string;
  updated_at: string | null;
  // Joined data
  camp?: SummerCamp;
};

export type CampFilters = {
  category?: string[];
  ageGroup?: string[];
  location?: string[];
  searchQuery?: string;
};
