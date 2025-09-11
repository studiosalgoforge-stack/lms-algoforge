// app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/login'); // Change to your "My Courses" route
}
