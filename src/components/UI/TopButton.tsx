"use client";
/* Utils */
import { useEffect, useState } from "react";

/* Components */
import { Button } from "@nextui-org/react";
import { ChevronUp } from "lucide-react";

const TopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Show or hide the button based on scroll position
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Button
      className={`fixed bottom-5 right-5 transition-opacity bg-transparent ${
        isVisible
          ? "opacity-100 border-medium border-primary-500 hover:bg-primary-500"
          : "opacity-0 invisible cursor-default"
      }`}
      isIconOnly
      onClick={scrollToTop}
      aria-label="Up"
    >
      <ChevronUp strokeWidth={1.5} />
    </Button>
  );
};

export default TopButton;
