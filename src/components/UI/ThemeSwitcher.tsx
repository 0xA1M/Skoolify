"use client";
/* Utils */
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/* Components */
import { Button } from "@nextui-org/react";
import { LuMoon, LuSun } from "react-icons/lu";

interface Props {
  isDropdown?: boolean;
}

function ThemeSwitcher({ isDropdown }: Props) {
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
          size={isDropdown ? "sm" : "md"}
          aria-label="Sun"
          className={`bg-transparent drop-shadow-lg ${
            isDropdown ? "" : "hover:bg-primary-500"
          } ${isDropdown ? "" : "hover:bg-opacity-20"}`}
        >
          <LuSun strokeWidth={1.4} size={isDropdown ? 21 : 24} />
        </Button>
      ) : (
        <Button
          onClick={() => setTheme("light")}
          isIconOnly
          size={isDropdown ? "sm" : "md"}
          aria-label="Moon"
          className={`bg-transparent drop-shadow-lg ${
            isDropdown ? "" : "hover:bg-primary-500"
          } ${isDropdown ? "" : "hover:bg-opacity-20"}`}
        >
          <LuMoon strokeWidth={1.4} size={isDropdown ? 21 : 24} />
        </Button>
      )}
    </>
  );
}

export default ThemeSwitcher;
