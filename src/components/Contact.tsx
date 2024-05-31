"use client";
/* Utils */
import { useState } from "react";
import { useTheme } from "next-themes";

/* Components */
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Image,
  Textarea,
  Input,
} from "@nextui-org/react";
import { LuInfo } from "react-icons/lu";
import { ToastContainer, TypeOptions, toast } from "react-toastify";

/* Styles */
import "react-toastify/dist/ReactToastify.css";

{
  /* TODO: Make the mail functionality actually works */
}

function Contact() {
  const { theme } = useTheme();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const notify = (msg: string, type: string) =>
    toast(msg, {
      autoClose: 5000,
      type: type as TypeOptions,
      pauseOnFocusLoss: false,
      theme: theme,
    });

  return (
    <section
      id="contact"
      className="p-8 sm:p-16 lg:p-4 w-full sm:h-screen h-80v grid grid-cols-1 lg:grid-cols-2 grid-rows-1 lg:gap-6 mb-8 items-center"
    >
      <ToastContainer limit={1} />

      <Card className="mx-auto w-5/6 h-80v p-6">
        <CardHeader className="flex justify-between items-center px-8">
          <h2 className="text-3xl">Get in Touch</h2>
          <LuInfo />
        </CardHeader>
        <Divider />
        <CardBody className="p-8 grid-cols-1 grid-rows-4 gap-4 overflow-hidden">
          <div className="grid grid-cols-2 grid-rows-1 gap-24">
            <Input
              variant="underlined"
              type="text"
              label="First Name"
              labelPlacement="inside"
              required
              isClearable
            />

            <Input
              variant="underlined"
              type="text"
              label="Last Name"
              labelPlacement="inside"
              required
              isClearable
            />
          </div>

          <Input
            variant="underlined"
            type="email"
            label="Email"
            labelPlacement="inside"
            radius="sm"
            required
            isClearable
            className="mb-6"
          />

          <Textarea
            variant="underlined"
            label="What can we help with?"
            required
            minRows={6}
            className="row-span-2"
          />
        </CardBody>
        <CardFooter className="flex justify-center items-center">
          <Button
            size="lg"
            variant="shadow"
            color="primary"
            isLoading={isLoading}
            className="mb-4"
          >
            Send
          </Button>
        </CardFooter>
      </Card>

      <aside className="flex items-center">
        <Image
          src="/Home/4.png"
          alt="Computer"
          isBlurred
          className="anime-float hidden lg:flex"
        />
      </aside>
    </section>
  );
}

export default Contact;
