import React from 'react';

export interface Car {
  id: number;
  name: string;
  brand: string; // Used as Category (e.g., Main Course)
  price: string;
  year: string; // Used as Prep Time or Calories
  image: string;
  features: string[]; // Ingredients
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ReservationData {
  id: number;
  created_at: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  type: 'reserva' | 'encomenda';
  status: 'pendente' | 'confirmado' | 'cancelado';
  notes?: string;
}