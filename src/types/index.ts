export  type Message = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
};

export type PortfolioItem = {
  id: number;
  title: string;
  category: string;
  image: string;
  client?: string;
  date?: string;
  description?: string;
};

export type Service = {
  id: number;
  icon: JSX.Element;
  title: string;
  description: string;
  category: string;
  features: string[];
  image: string;
};

export type SiteSettings = {
  email: string;
  phone: string;
  address: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
};
 