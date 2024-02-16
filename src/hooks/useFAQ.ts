'use client'

import { FAQ } from '@/types';
import { useState } from 'react';
import { API_URL } from './config';
import Faq from "./faqs.json";

export default function useFAQs() {
  const [faqs, setFaqs] = useState<FAQ[] | null>(null);
  const fetchFAQs = async () => {
    setFaqs(Faq.data.map((o: any) => ({ ...o.attributes })));
    try {
      const response = await fetch(
        `${API_URL}/faqs.json`
      );
      const data = await response.json();
      const faqs = data.data.map((o: any) => ({ ...o.attributes }));
      setFaqs(faqs);
    } catch (error) {
      console.error(error);
    }
  };
  !faqs && fetchFAQs();

  return faqs;
}
