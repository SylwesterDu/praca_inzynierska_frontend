"use client";

import { createTheme, NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "../AuthContext";
import { TopBar } from "../components/TopBar";

export default function Providers({ children }: { children: React.ReactNode }) {
  const darkTheme = createTheme({
    type: "dark",
    theme: {
      colors: {},
    },
  });

  return (
    <NextUIProvider theme={darkTheme}>
      <AuthProvider>
        <TopBar />
        <div style={{ height: 100 }}></div>

        {children}
      </AuthProvider>
    </NextUIProvider>
  );
}
