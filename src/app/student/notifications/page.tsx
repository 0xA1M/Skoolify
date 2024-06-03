"use client";
/* Utils */
import { useRouter } from "next/navigation";
 // {id:getCookie("token")}
/* Components */
import { Button, Link, Card, CardBody, CardHeader } from "@nextui-org/react";
import { MdChevronLeft } from "react-icons/md";
import { useEffect } from "react";

function NotificationFeed() {
 useEffect(()=>{
  const Fetch=async()=>{
    const response = await fetch(`http://localhost:3000/api/getNotification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id:1100}),
    });
   const data=await response.json();
   console.log(data)
  }
  Fetch();
 },[])
 const router = useRouter();
  return (
    <section className="w-full h-full p-6">
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
         
        </CardBody>
      </Card>
    </section>
  );
}

export default NotificationFeed;
