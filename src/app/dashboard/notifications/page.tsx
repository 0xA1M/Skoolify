"use client";
/* Utils */
import { useRouter } from "next/navigation";

/* Components */
import { Button, Link, Card, CardBody, CardHeader } from "@nextui-org/react";
import { MdChevronLeft } from "react-icons/md";

function NotificationFeed() {
  const router = useRouter();

  return (
    <section className="w-full h-full p-10">
      <Card className="w-full h-full p-4 z-50">
        <CardHeader className="w-full">
          <Button
            isIconOnly
            size="sm"
            color="primary"
            variant="ghost"
            as={Link}
            onClick={() => router.back()}
          >
            <MdChevronLeft size={32} />
          </Button>

          <h1 className="font-bold text-4xl mx-auto">Notifications</h1>
        </CardHeader>
        <CardBody className="grid place-content-center text-3xl">
          Stay Tuned!
        </CardBody>
      </Card>
    </section>
  );
}

export default NotificationFeed;
