"use client";
/* Utils */
import { useState } from "react";

/* Components */
import { Image, Card, CardHeader, CardBody } from "@nextui-org/react";
import { LuArrowLeft } from "react-icons/lu";
import Link from "next/link";

/* Custom Components */
import ThemeSwitcher from "@/components/UI/ThemeSwitcher";
import Logo from "@/components/UI/Logo";
import Form from "./(components)/Form";
import ProgressBar from "@/components/ProgressBar";

/* Types */
import type { FormDataType } from "./(components)/Form";

function SignUp() {
  // Keep track of the progress of the client
  const [step, setStep] = useState<number>(0);

  // Store all of the data submitted by the client in this FormData Scheme, Find the definition in ./Form
  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phone: 0,
    gender: "",
    role: "",
    level: "",

    subjects: [],
    password: "",
  });

  /* Display a different image to the client, after each step */
  let ImageNode: React.JSX.Element;
  switch (step) {
    case 0:
      ImageNode = (
        <Image src="/Auth/guyWithBook.png" alt="" className="w-auto h-full" />
      );
      break;
    case 1:
      ImageNode = (
        <Image
          src={
            formData.role == "teacher"
              ? "/Auth/register/teacher.png"
              : "/Auth/register/student.png"
          }
          alt=""
          className="w-auto h-full"
        />
      );
      break;
    case 2:
      ImageNode = (
        <Image
          src="/Auth/register/security.png"
          alt=""
          className="w-auto h-full"
        />
      );
      break;
    case 3:
      ImageNode = (
        <Image
          src="/Auth/register/settings.png"
          alt=""
          className="transform scale-75 hidden lg:block"
        />
      );
      break;
  }

  return (
    <section className="w-full h-screen grid grid-cols-1 lg:grid-cols-3 grid-rows-1">
      <aside className="hidden lg:flex bg-primary-500 flex-col items-center justify-center">
        <h1 className="w-full text-center flex flex-col text-4xl m-4">
          Get Started with <span className="text-warning-500">SKOOLIFY</span>
        </h1>
        {ImageNode!}
      </aside>

      <article className="col-span-2 m-3">
        <Card className="w-full h-full">
          <CardHeader className="h-14 flex items-center justify-center">
            <div className="flex item-center justify-center mr-auto">
              <Link
                href="/"
                className="p-2 rounded-xl transition-background duration-200 ease-in-out hover:bg-primary-500 hover:bg-opacity-20 drop-shadow-lg self-center"
              >
                <LuArrowLeft className="text-foreground" />
              </Link>

              <Logo />
            </div>

            <ThemeSwitcher />
          </CardHeader>
          <CardBody className="w-full h-full grid-cols-1 grid-rows-2 gap-4 place-items-center">
            <Form
              step={step}
              formData={formData}
              setStep={setStep}
              setFormData={setFormData}
            />

            <ProgressBar progress={step} />
          </CardBody>
        </Card>
      </article>
    </section>
  );
}

export default SignUp;
