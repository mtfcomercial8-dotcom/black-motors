export interface Car {
  id: number;
  name: string;
  brand: string;
  price: string;
  year: number;
  image: string;
  features: string[];
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
}