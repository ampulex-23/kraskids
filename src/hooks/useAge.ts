import { AgeTag } from '@/types';
import { useSearchParams } from 'next/navigation';

export default function useAge(): AgeTag {
  const searchParams = useSearchParams()
  const ageParam = searchParams.get('age')
  const age: AgeTag = ageParam ? ageParam as AgeTag : 'all';
  return age
}