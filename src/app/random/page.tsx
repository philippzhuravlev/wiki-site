import { redirect } from 'next/navigation';
import { Eras } from '@/types/era';

export default function RandomPage() {
  // For now, just redirect to a random era
  const eras = Object.values(Eras);
  const randomEra = eras[Math.floor(Math.random() * eras.length)];
  
  redirect(`/${randomEra}`);
} 