'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter()
  
  useEffect(() => {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token'); 
      if(user && token) {
          router.push('/');
      } else {
        router.push('/auth/login');
      }
  }, []);
  
  return (
    <>
      <main className="container mx-auto pb-20">{children}</main>
    </>
  );
}
