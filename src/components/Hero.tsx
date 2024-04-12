/* Components */
import { Button, Image, Link } from "@nextui-org/react";

function Hero() {
  return (
    <section className="p-8 sm:p-16 lg:p-4 w-full sm:h-screen h-80v grid grid-cols-1 md:grid-cols-2 grid-rows-1 lg:gap-4 mb-8">
      <article className="sm:mb-12 text-center flex p-4 flex-col justify-center items-center sm:mt-0">
        <h1 className="text-3xl lg:text-4xl font-bold mb-6 sm:p-2 w-full text-center">
          <span className="text-primary-600">Skoolify </span>
          Revolutionizing School Management
        </h1>

        <p className="text-lg lg:text-xl mb-9">
          Join us at Skoolify and unlock your full potential. Together,
          we&apos;ll embark on a journey of discovery, growth and achievement.
          Welcome to a school where every student matters and every success{" "}
          story begins
        </p>

        <Button
          as={Link}
          size="lg"
          href="/register"
          variant="shadow"
          color="primary"
        >
          Get Started
        </Button>
      </article>

      <aside className="flex items-center">
        <Image
          src="/Home/5.png"
          alt="Computer"
          isBlurred
          className="anime-float relative right-4 lg:right-0 hidden md:flex lg:mr-0"
        />
      </aside>
    </section>
  );
}

export default Hero;
