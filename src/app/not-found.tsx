import { Image } from "@nextui-org/react";

function NotFound() {
  return (
    <div className="px-16 mt-12 flex items-center justify-center">
      <Image
        src="/404.png"
        alt="404 | Nothing Here!"
        className="w-auto h-screen"
        isBlurred
      />
    </div>
  );
}

export default NotFound;
