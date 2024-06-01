"use client";
/* Utils */
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";

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
import { ToastContainer, TypeOptions, toast } from "react-toastify";

/* Custom Components */
import ThemeSwitcher from "@/components/UI/ThemeSwitcher";

/* Styles */
import "react-toastify/dist/ReactToastify.css";

function AdminLogin() {
  const router = useRouter();
  const { theme } = useTheme();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(false);

  const notify = (msg: string, type: string) =>
    toast(msg, {
      autoClose: 5000,
      type: type as TypeOptions,
      pauseOnFocusLoss: false,
      theme: theme,
    });

  async function submitData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const email: string = event.currentTarget.email.value;
    const password: string = event.currentTarget.password.value;

    const data = JSON.stringify({
      email: email,
      password: password,
      role: "admin",
    });

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/api/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });

      const Data = await response.json();

      if (response.status == 400) {
        throw new Error(Data.error);
      } else {
        const oneDay = 24 * 60 * 60 * 1000;
        const token = String(Data);
        Cookies.set("token", token, { expires: Date.now() - oneDay });

        notify("Hold Tight! You're Being Redirected.", "info");

        setTimeout(() => {
          setLoading(false);
          router.push("/dashboard");
        }, 3000);
      }
    } catch (error: any) {
      setTimeout(() => {
        setLoading(false);

        notify("Email or Password are incorrect!", "error");
      }, 3000);
    }
  }

  return (
    <section className="w-full h-screen flex justify-center items-center flex-col mx-auto max-w-6xl">
      <ToastContainer limit={1} />

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
                <LuArrowLeft className="text-foreground" size={24} />
              </Link>
            </article>

            <h1 className="font-bold text-2xl md:text-3xl">Welcome Back</h1>

            <ThemeSwitcher />
          </CardHeader>
          <Divider />
          <CardBody>
            <form
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
                        onClick={() => setIsVisible(!isVisible)}
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

              <div className="m-4 w-full flex flex-col items-center justify-center">
                <Button
                  variant="shadow"
                  color="primary"
                  className="m-4 py-6 px-8 mt-10 md:mt-0"
                  size="lg"
                  type="submit"
                  radius="sm"
                  isLoading={Loading}
                >
                  Login
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </section>
    </section>
  );
}

export default AdminLogin;
