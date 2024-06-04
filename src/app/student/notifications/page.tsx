"use client";
/* Utils */
import { useRouter } from "next/navigation";
 // {id:getCookie("token")}
/* Components */
import { Button, Link, Card, CardBody, CardHeader, Accordion, AccordionItem } from "@nextui-org/react";
import { MdChevronLeft } from "react-icons/md";
import { useEffect, useState } from "react";

function NotificationFeed() {
  const [data,Setdata]=useState([]);
 useEffect(()=>{
  const Fetch=async()=>{
    const response = await fetch(`http://localhost:3000/api/getNotification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id:1100}),
    });
   const notifis=await response.json();
   Setdata(notifis)
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
        <CardBody className=" p-32 text-3xl">
         {
          data.map((ele:any,key:number)=>{
            return(
              <Accordion className=" w-[50%] m-2" variant="splitted">
              <AccordionItem className=" w-full text-3xl"  key={key} aria-label={`Accordion ${key}`} title={`Notification ${key} from : Admin`}>
                {ele.content}
              </AccordionItem>
            </Accordion>
            )
          })
         }
        </CardBody>
      </Card>
    </section>
  );
}

export default NotificationFeed;
/*
 <Accordion className=" w-[50%]" variant="splitted">
                <AccordionItem className=" w-full text-3xl"  key={key} aria-label={`Accordion ${key}`} title={`Notification ${key} from : Admin`}>
                  {ele.content}
                </AccordionItem>
              </Accordion>
*/