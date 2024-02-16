'use client'

import { useState } from 'react';
import { API_URL } from './config';
import { Category } from '@/types';
import Categories from './categories.json';

export default function useCategories() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const fetchCategories = async () => {
    setCategories(Categories.data.sort((a: any, b: any) => a.id - b.id)
    .map((o: any) => ({ ...o.attributes })))
    try {
      const response = await fetch(
        `${API_URL}/categories.json`
      );
      const data = await response.json();
      const categories = data.data
        .sort((a: any, b: any) => a.id - b.id)
        .map((o: any) => ({ ...o.attributes }))
        .filter((o: any) => !o.disabled);
      setCategories(categories);
    } catch (error) {
      console.error(error);
    }
  };
  !categories && fetchCategories();
  return categories;
}
