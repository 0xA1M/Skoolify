"use client";
/* Utils */
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

/* Component */
import { Button, Image } from "@nextui-org/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const events = [
    {
      img: "/Home/door.jpg",
      alt: "door",
    },
    {
      img: "/Home/computer.jpg",
      alt: "Computer",
    },
    {
      img: "/Home/cityscape.jpg",
      alt: "cityscape",
    },
  ];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="embla rounded-lg" ref={emblaRef}>
      <div className="embla__viewport">
        {events.map((event, i) => (
          <div key={i} className="mx-2 embla__slide">
            <Image
              src={event.img}
              alt={event.alt}
              className="w-auto h-full shadow-lg"
            />
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        color="primary"
        isIconOnly
        className="hidden lg:flex justify-center items-center embla__prev shadow-md"
        onClick={scrollPrev}
      >
        <LuChevronLeft />
      </Button>

      <Button
        variant="ghost"
        color="primary"
        isIconOnly
        className="hidden lg:flex justify-center items-center embla__next shadow-md"
        onClick={scrollNext}
      >
        <LuChevronRight />
      </Button>
    </div>
  );
}

export default Carousel;
