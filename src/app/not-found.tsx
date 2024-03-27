"use client";
/* Utils */
import { useRouter } from "next/navigation";

/* Components */
import { Image, Button, Link } from "@nextui-org/react";

/* Custom Components */
import Provider from "@/components/UI/Provider";

function NotFound() {
  const router = useRouter();

  return (
    <Provider>
      <div className="px-16 mt-12 flex items-center justify-center flex-col">
        <Image
          src="/404.png"
          alt="404 | Nothing Here!"
          className="w-auto h-80v"
          isBlurred
        />

        <Button as={Link} onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    </Provider>
  );
}

export default NotFound;
