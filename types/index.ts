export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  department: string;
  role: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  featured: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  organizer: string;
}

export interface Document {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  uploadDate: string;
  category: string;
  department: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavigationItem[];
}
