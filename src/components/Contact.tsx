"use client";
/* Utils */
import { ChangeEvent, useState } from "react";
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
import { IoIosSend } from "react-icons/io";
import { ToastContainer, TypeOptions, toast } from "react-toastify";

/* Styles */
import "react-toastify/dist/ReactToastify.css";

/* Types */
type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

function Contact() {
  const { theme } = useTheme();

  const [userInfo, setUserInfo] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setUserInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = () => {
    /* Check if user as filled the required info */
    if (Object.values(userInfo).every((value) => value.trim() == "")) {
      notify("Please fill in all the required info!", "error");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setUserInfo({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });

      setLoading(false);
    }, 3000);

    notify("You're Message has been sent!", "success");
  };

  const notify = (msg: string, type: string) =>
    toast(msg, {
      autoClose: 5000,
      type: type as TypeOptions,
      pauseOnFocusLoss: false,
      theme: theme,
    });

  return (
    <>
      <ToastContainer limit={1} />

      <section
        id="contact"
        className="p-8 sm:p-16 lg:p-4 w-full sm:h-screen h-80v grid grid-cols-1 lg:grid-cols-2 grid-rows-1 lg:gap-6 mb-8 mt-20 items-center"
      >
        <Card className="mx-auto w-5/6 h-80v p-6">
          <CardHeader className="flex justify-between items-center px-8">
            <h2 className="text-3xl">Get in Touch</h2>
            <LuInfo size={24} />
          </CardHeader>
          <Divider />
          <CardBody className="p-8 grid-cols-1 grid-rows-4 gap-4 overflow-hidden">
            <div className="grid grid-cols-2 grid-rows-1 gap-24">
              <Input
                variant="underlined"
                type="text"
                label="First Name"
                name="firstName"
                labelPlacement="inside"
                value={userInfo.firstName}
                onChange={handleInputChange}
                isRequired
                isClearable
              />

              <Input
                variant="underlined"
                type="text"
                label="Last Name"
                name="lastName"
                value={userInfo.lastName}
                onChange={handleInputChange}
                labelPlacement="inside"
                isRequired
                isClearable
              />
            </div>

            <Input
              variant="underlined"
              type="email"
              label="Email"
              value={userInfo.email}
              name="email"
              onChange={handleInputChange}
              labelPlacement="inside"
              radius="sm"
              isRequired
              isClearable
              className="mb-6"
            />

            <Textarea
              variant="underlined"
              label="What can we help with?"
              isRequired
              value={userInfo.message}
              name="message"
              onChange={handleInputChange}
              minRows={6}
              className="row-span-2"
            />
          </CardBody>
          <CardFooter className="flex justify-center items-center">
            <Button
              size="lg"
              variant="shadow"
              color="primary"
              className="text-lg flex items-center justify-center gap-2 mb-4"
              onClick={handleSubmit}
              isLoading={loading}
            >
              {!loading && "Send"}
              {!loading && <IoIosSend size={24} />}
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
    </>
  );
}

export default Contact;
