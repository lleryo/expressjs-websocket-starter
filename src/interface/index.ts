export interface UserProps {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  image: string;
  role: 'user' | 'admin' | 'editor' | 'writer';
  isActive: boolean;
  bio: string;
  location: string;
  phoneNumber: string;
  isVerified: boolean;
  cover: string;
}
