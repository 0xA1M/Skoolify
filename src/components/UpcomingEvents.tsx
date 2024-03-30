/* Custom Components */
import Carousel from "./UI/Carousel";

function UpcomingEvents() {
  return (
    <section
      id="events"
      className="relative w-11/12 xl:w-full mx-auto h-80v px-20
    "
    >
      <Carousel />
    </section>
  );
}

export default UpcomingEvents;
