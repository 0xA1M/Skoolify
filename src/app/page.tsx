/* Custom Components */
import Hero from "@/components/Hero";

function Home() {
  return (
    <>
      <Hero />

      {/* Features Section */}
      <section
        className="p-8 sm:p-16 lg:p-4 w-full sm:h-screen h-80v grid grid-cols-1 md:grid-cols-2 grid-rows-1 lg:gap-4"
        id="features"
      >
        <h1>Features</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores
          illum suscipit sunt vero explicabo provident veniam assumenda? Minima
          earum, error minus doloribus ab, magni dicta tempora temporibus in
          beatae voluptatem!
        </p>
      </section>

      {/* Events Section */}
      <section
        className="p-8 sm:p-16 lg:p-4 w-full sm:h-screen h-80v grid grid-cols-1 md:grid-cols-2 grid-rows-1 lg:gap-4 mb-8"
        id="events"
      >
        <h1>Upcoming Events</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores
          illum suscipit sunt vero explicabo provident veniam assumenda? Minima
          earum, error minus doloribus ab, magni dicta tempora temporibus in
          beatae voluptatem!
        </p>
      </section>

      {/* Contact Section */}
      <section
        className="p-8 sm:p-16 lg:p-4 w-full sm:h-screen h-80v grid grid-cols-1 md:grid-cols-2 grid-rows-1 lg:gap-4 mb-8"
        id="contact"
      >
        <h1>Contact Us</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores
          illum suscipit sunt vero explicabo provident veniam assumenda? Minima
          earum, error minus doloribus ab, magni dicta tempora temporibus in
          beatae voluptatem!
        </p>
      </section>
    </>
  );
}

export default Home;
