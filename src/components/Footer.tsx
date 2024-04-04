/* Components */
import { FaInstagram, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";
import { Link } from "@nextui-org/link";
import { LuMapPin } from "react-icons/lu";
import { Tooltip } from "@nextui-org/react";

/* Custom Components */
import Logo from "./UI/Logo";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full grid grid-cols-2 lg:grid-cols-4 grid-rows-1 gap-5 px-4 items-center">
      <Logo isIndependent />

      <section className="hidden ml-16 col-span-2 col-start-2 text-center lg:block">
        <p className="text-lg opacity-80 flex justify-center items-center">
          &copy; {currentYear} SKOOLIFY . All Rights Reserved.
        </p>
      </section>

      <section className="justify-self-end flex justify-center items-center">
        <Link
          size="lg"
          isExternal
          href="https://www.google.com/maps/place/%C3%89cole+sup%C3%A9rieure+en+Sciences+et+Technologies+de+l'Informatique+et+du+Num%C3%A9rique/@36.6636469,4.9099606,17z/data=!3m1!4b1!4m6!3m5!1s0x128d2fea39a0172f:0x375f0181ae906e45!8m2!3d36.6636426!4d4.9125355!16s%2Fg%2F12m923p9h?entry=ttu"
          color="primary"
        >
          <Tooltip showArrow content="Amizour - Bejaia, Algeria">
            <LuMapPin className="w-6 h-6 sm:w-8 sm:h-8 mx-1.5" />
          </Tooltip>
        </Link>

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
