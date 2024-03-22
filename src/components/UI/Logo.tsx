"use client";
/* Utils */
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

/* Components */
import Image from "next/image";

/* Assets */
import logoDark from "/public/LogoDark.png";
import logoLight from "/public/LogoLight.png";

interface Props {
  isFooter?: boolean;
}

function Logo({ isFooter }: Props) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  let Logo = resolvedTheme == "light" ? logoLight : logoDark;

  /* Added this to prevent the rendering of the logo until the theme is resolved to prevent a hydration mismatch */
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Image
      src={Logo}
      alt="Skoolify"
      quality={100}
      className={`w-auto ${isFooter ? "h-28" : "h-16"} `}
      fetchPriority="high"
    />
  );
}

export default Logo;
