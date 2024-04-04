"use client";
/* Utils */
import { useEffect, useState } from "react";

/* Components */
import { Button } from "@nextui-org/react";
import { LuChevronUp } from "react-icons/lu";

const TopButton = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [reachedBottom, setReachedBottom] = useState<boolean>(false);

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

    // Calculate a threshold distance from the bottom
    const threshold = 30;
    const bottomOffset = document.body.offsetHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    if (bottomOffset - scrollPosition <= threshold) {
      setReachedBottom(true);
    } else {
      setReachedBottom(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Button
      className={`fixed ${
        reachedBottom ? "-translate-y-28" : ""
      } right-5 bottom-5 transition-opacity bg-transparent ${
        isVisible
          ? "opacity-100 border-medium border-primary-500 hover:bg-primary-500"
          : "opacity-0 invisible cursor-default"
      }`}
      isIconOnly
      onClick={scrollToTop}
      aria-label="Up"
    >
      <LuChevronUp strokeWidth={1.5} />
    </Button>
  );
};

export default TopButton;
