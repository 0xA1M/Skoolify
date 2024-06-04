"use client";
/* Utils */
import { useRouter } from "next/navigation";

/* Components */
import { Button, Link, Card, CardBody, CardHeader, Textarea, Input } from "@nextui-org/react";
import { MdChevronLeft } from "react-icons/md";

function Settings() {
  const router = useRouter();
  var value:string;
  var Emial:string;
  const Send=async () =>{
    const response = await fetch(`http://localhost:3000/api/addNotification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({sender:Emial,content:value }),
    });
  }

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

          <h1 className="font-bold text-4xl mx-auto">Settings</h1>
        </CardHeader>
        <CardBody className="w-full  flex items-center justify-between place-content-center text-3xl">
        <Textarea
       label="Description"
        variant="bordered"
        placeholder="Enter your content"
        disableAnimation
         disableAutosize
         onChange={(event:React.ChangeEvent <HTMLInputElement>)=>{value=event.target.value}}
       classNames={{
          base: " max-w-lg",
          input: " resize-y min-h-[200px]",
       }}
    />
      <div className="flex w-[30%] flex-wrap md:flex-nowrap gap-4">
      <Input type="email" label="Email" onChange={(event:React.ChangeEvent <HTMLInputElement>)=>{Emial=event.target.value}} placeholder="Enter your email" />
    </div>
    <Button onClick={Send}>Send</Button>
        </CardBody>
      </Card>
    </section>
  );
}

export default Settings;
