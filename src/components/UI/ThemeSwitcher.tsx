"use client";
/* Utils */
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/* Components */
import { Button } from "@nextui-org/react";
import { Moon, Sun } from "lucide-react";

function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {theme == "light" ? (
        <Button
          onClick={() => setTheme("dark")}
          isIconOnly
          aria-label="Moon"
          className="bg-transparent hover:bg-primary-500 hover:bg-opacity-20 drop-shadow-lg"
        >
          <Sun strokeWidth={1.4} />
        </Button>
      ) : (
        <Button
          onClick={() => setTheme("light")}
          isIconOnly
          aria-label="Sun"
          className="bg-transparent hover:bg-primary-500 hover:bg-opacity-20 drop-shadow-lg"
        >
          <Moon strokeWidth={1.4} />
        </Button>
      )}
    </>
  );
}

export default ThemeSwitcher;
