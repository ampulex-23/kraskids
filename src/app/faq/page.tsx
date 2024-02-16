'use client';
import Button from '@/components/common/Button';
import Counter from '@/components/common/Counter';
import FAQItem from '@/components/common/FAQItem';
import useAge from '@/hooks/useAge';
import useCfg from '@/hooks/useCfg';
import useFAQs from '@/hooks/useFAQ';
import { ClassTag, EquipmentTag, Rent } from '@/types';
import { Suspense } from 'react';

const FAQ = () => {
  const faqs = useFAQs();
  const cfg = useCfg();
  const age = useAge();
  
  if (!faqs) {
    return null;
  }
  
  return (
    <main
      className="flex flex-col items-start gap-[20px] 
      pb-[250px] md:pb-[120px]
      px-[15px] sm:px-[25px] md:px-[30px] lg:px-[35px]"
    >
      <Suspense>
      <div className='flex flex-row items-start justify-start w-full'>
          <strong className='text-blue text-[40px] font-[900]'>Вопросы и ответы</strong>
      </div>
      <div className='flex flex-col items-start gap-[20px] w-full'>
        {faqs.map((faq, i) => <FAQItem key={i} faq={faq} />)}
      </div> 
      </Suspense>
    </main>
  );
};

export default FAQ;
