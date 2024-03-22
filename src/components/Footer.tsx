/* Components */
import { FaInstagram, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";
import { Link } from "@nextui-org/link";

/* Custom Components */
import Logo from "./UI/Logo";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full grid grid-cols-2 lg:grid-cols-4 grid-rows-1 gap-5 px-4 items-center ">
      <Logo isFooter />

      <section className="hidden lg:block ml-16 col-span-2 col-start-2 text-center">
        <p className="text-lg">
          &copy; {currentYear} Your Company Name. All Rights Reserved.
        </p>
      </section>

      <section className="justify-self-end flex justify-center items-center">
        <Link isExternal href="instagram.com" color="foreground">
          <FaInstagram className="w-6 h-6 sm:w-8 sm:h-8 mx-1.5" />
        </Link>

        <Link isExternal href="facebook.com" color="foreground">
          <FaFacebook className="w-6 h-6 sm:w-8 sm:h-8 mx-1.5" />
        </Link>

        <Link
          isExternal
          href="https://github.com/0xA1M/Schoolify"
          color="foreground"
        >
          <FaGithub className="w-6 h-6 sm:w-8 sm:h-8 mx-1.5" />
        </Link>

        <Link isExternal href="linkedin.com" color="foreground">
          <FaLinkedin className="w-6 h-6 sm:w-8 sm:h-8 mx-1.5" />
        </Link>
      </section>
    </footer>
  );
}

export default Footer;
