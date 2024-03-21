"use client";
/* Utils */
import { useRouter } from "next/navigation";

/* Components */
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";

interface Props {
  children: React.ReactNode;
}

function Provider({ children }: Props) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <ThemeProvider attribute="class" enableSystem enableColorScheme>
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
}

export default Provider;
