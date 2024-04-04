"use client";
/* Utils */
import { FormEvent, useState } from "react";

/* Components */
import {
  Input,
  Button,
  Image,
  Card,
  CardHeader,
  CardBody,
  Divider,
} from "@nextui-org/react";
import {
  LuArrowLeft,
  LuEye,
  LuEyeOff,
  LuMail,
  LuKeyRound,
} from "react-icons/lu";
import Link from "next/link";

/* Custom Components */
import ThemeSwitcher from "@/components/UI/ThemeSwitcher";

function AdminLogin() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  async function submitData(event: FormEvent<HTMLFormElement>) {
    const email: string = event.currentTarget.email.value;
    const password: string = event.currentTarget.password.value;

    console.log("data will be passed to the server");
  }

  return (
    <section className="w-full h-screen flex justify-center items-center flex-col mx-auto max-w-6xl">
      <section className="p-4 grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-4">
        <aside className="w-full h-full flex justify-between items-center mr-14">
          <Image
            src="/Auth/admin.png"
            alt=""
            isBlurred
            className="w-full h-auto anime-float hidden lg:flex"
          />
        </aside>

        <Card className="p-2">
          <CardHeader className="w-full flex items-center justify-between text-center flex-row p-4">
            <article className="flex items-center justify-between">
              <Link
                href="/login"
                className="p-2 rounded-xl transition-background duration-200 ease-in-out hover:bg-primary-500 hover:bg-opacity-20 drop-shadow-lg"
              >
                <LuArrowLeft className="text-foreground" />
              </Link>
            </article>

            <h1 className="font-bold text-2xl md:text-3xl">Welcome Back</h1>

            <ThemeSwitcher />
          </CardHeader>
          <Divider />
          <CardBody>
            <form
              method="POST"
              onSubmit={submitData}
              className="w-full h-full flex flex-col justify-between items-center py-6 md:py-12 px-6 md:px-0"
            >
              <div className="w-full h-full">
                <div className="w-full flex items-center justify-center md:px-4">
                  <label htmlFor="email">
                    <LuMail />
                  </label>
                  <Input
                    id="email"
                    variant="bordered"
                    label="Email"
                    type="email"
                    name="email"
                    isRequired
                    className="m-4 w-full md:w-9/12"
                  />
                </div>

                <div className="w-full flex items-center justify-center md:px-4">
                  <label htmlFor="pass">
                    <LuKeyRound />
                  </label>
                  <Input
                    id="pass"
                    label="Password"
                    variant="bordered"
                    name="password"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <LuEyeOff className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <LuEye className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    isRequired
                    className="m-4 w-full md:w-9/12"
                  />
                </div>
              </div>

              <Button
                variant="shadow"
                color="primary"
                className="m-4 py-6 px-8 mt-10 md:mt-0"
                size="lg"
              >
                Login
              </Button>
            </form>
          </CardBody>
        </Card>
      </section>
    </section>
  );
}

export default AdminLogin;
