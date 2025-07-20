export type RegisterData = {
  email: string;
  password: string;
};

export type UpdateProfileData = {
  first_name?: string;
  last_name?: string;
  wedding_date?: string;
  partner_name?: string;
  phone?: string;
  avatar_url?: string;
  preferences?: Record<string, any>;
};

export type UserProfile = {
  id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  wedding_date?: string;
  partner_name?: string;
  phone?: string;
  avatar_url?: string;
  preferences?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}; 