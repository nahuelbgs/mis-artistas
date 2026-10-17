'use client'
import dynamic from "next/dynamic";

const Login = dynamic(() => import("@/components/Login"), { ssr: false });

export default function Home() {
  return (
    <main className="h-full dark text-foreground">
        <Login />
    </main>
  )
}
