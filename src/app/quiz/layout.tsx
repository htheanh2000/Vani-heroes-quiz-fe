"use client"
import { useAppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function QuizLayout({
    children,
  }: {
    children: React.ReactNode;
    
  }) {
    const dispatch = useAppDispatch()
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('access_token');
      if(!token) {
        router.push("/onboarding") 
      }

    },[dispatch, router])

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {children}
        </Suspense>
    )
  }