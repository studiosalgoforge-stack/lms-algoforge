// app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/course'); // Change to your "My Courses" route
}
