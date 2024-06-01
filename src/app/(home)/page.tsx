/* Custom Components */
import Hero from "@/components/Hero";
import Features from "@/components/Features";
// import UpcomingEvents from "@/components/UpcomingEvents";
import Contact from "@/components/Contact";

function Home() {
  return (
    <>
      <Hero />
      <Features />
      {/* <UpcomingEvents /> */}
      <Contact />
    </>
  );
}

export default Home;
