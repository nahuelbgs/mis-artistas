// app/providers.tsx
"use client";
import { NextUIProvider } from "@nextui-org/react";
import { MyContextProvider } from "../components/Context/AppContext";
export function Providers({ children }) {
  return (
    <NextUIProvider>
      <MyContextProvider>{children}</MyContextProvider>
    </NextUIProvider>
  );
}
