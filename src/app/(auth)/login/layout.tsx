/* Components */
import { Image } from "@nextui-org/react";

/* Custom Components */
import Logo from "@/components/UI/Logo";

interface Props {
  children: React.ReactNode;
}

function LoginLayout({ children }: Props) {
  return (
    <>
      <header className="absolute flex justify-between w-full overflow-hidden">
        <Logo isIndependent />

        <Image
          src="/Auth/pageTop.png"
          alt=""
          className="hidden lg:flex w-full h-full -top-5 -right-5 transform scale-x-[-1] -z-10"
        />
      </header>
      {children}
    </>
  );
}

export default LoginLayout;
