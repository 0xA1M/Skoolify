/* Components */
import { Card, CardBody } from "@nextui-org/react";
import {
  LuApple,
  LuArrowLeft,
  LuGraduationCap,
  LuUserCog,
} from "react-icons/lu";
import Link from "next/link";

/* Custom Components */
import ThemeSwitcher from "@/components/UI/ThemeSwitcher";

function Login() {
  const clients = [
    {
      title: "Admin",
      link: "login/admin",
    },
    {
      title: "Teacher",
      link: "login/teacher",
    },
    {
      title: "Student",
      link: "login/student",
    },
  ];

  return (
    <>
      <section className="w-full h-screen flex justify-center items-center flex-col mx-auto max-w-4xl p-28">
        <section className="w-full md:w-9/12 flex items-center justify-between text-center flex-row p-2">
          <article className="flex items-center justify-between">
            <Link
              href="/"
              className="-ml-12 md:ml-0 p-2 rounded-xl transition-background duration-200 ease-in-out hover:bg-primary-500 hover:bg-opacity-20 drop-shadow-lg"
            >
              <LuArrowLeft className="text-foreground" />
            </Link>

            <h1 className="text-primary font-bold text-3xl ml-4 md:ml-3">
              LOGIN
            </h1>
          </article>
          <div className="hidden md:flex">
            <ThemeSwitcher />
          </div>
        </section>

        <section className="w-full md:w-4/6 m-4">
          {clients.map((client, index) => (
            <Link key={index} href={client.link}>
              <Card
                className="p-2 m-4 dark:bg-neutral-950"
                isHoverable
                isPressable
                fullWidth
              >
                <CardBody className="flex items-center justify-start flex-row">
                  {client.title == "Admin" && <LuUserCog size={30} />}
                  {client.title == "Teacher" && <LuApple size={30} />}
                  {client.title == "Student" && <LuGraduationCap size={30} />}

                  <p className="ml-4 text-lg">{client.title}</p>
                </CardBody>
              </Card>
            </Link>
          ))}
        </section>

        <p className="text-center">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="p-1 text-primary">
            Register Now!
          </Link>
        </p>
      </section>
    </>
  );
}

export default Login;
