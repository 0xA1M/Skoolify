"use client";
/* Utils */
import { useState } from "react";
import { redirect } from "next/navigation";

/* Components */
import { Image, Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import { LuArrowLeft } from "react-icons/lu";

/* Custom Components */
import ThemeSwitcher from "@/components/UI/ThemeSwitcher";
import Logo from "@/components/UI/Logo";
import Form from "./(components)/Form";
import ProgressBar from "@/components/ProgressBar";

/* Types */
import type { FormDataType } from "./(components)/Form";

function SignUp() {
  // Keep track of the server response after send the data
  const [loading, setLoading] = useState<number>(0);

  // Keep track of the progress of the client
  const [step, setStep] = useState<number>(0);

  // Store all of the data submitted by the client in this FormData Scheme, Find the definition in ./Form
  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    gender: "",
    role: "",
    levels: [],
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
          className={`${
            formData.role === "teacher" ? "w-full h-[32rem]" : "w-full h-96"
          }`}
        />
      );
      break;
    case 2:
      ImageNode = (
        <Image
          src="/Auth/register/security.png"
          alt=""
          className="w-auto h-full scale-90"
        />
      );
      break;
    case 3:
      ImageNode = (
        <Image
          src="/Auth/register/settings.png"
          alt=""
          className="w-auto h-full scale-95"
        />
      );
      break;
  }

  return (
    <section className="w-full h-screen grid grid-cols-1 lg:grid-cols-3 grid-rows-1">
      <aside className="hidden lg:flex bg-primary-500 flex-col items-center justify-center gap-4">
        {step === 0 && (
          <h1 className="text-white w-full text-center flex flex-col text-4xl font-semibold m-4">
            Get Started with{" "}
            <span className="m-1 text-warning-500 font-bold">SKOOLIFY</span>
          </h1>
        )}

        {step === 1 && (
          <>
            {formData.role === "teacher" ? (
              <h1 className="m-4 mb-8 text-white text-4xl text-center">
                Pick your{" "}
                <span className="text-warning-500 font-semibold">Levels</span> &{" "}
                <span className="text-warning-500 font-semibold">Subjects</span>
              </h1>
            ) : (
              <h1 className="m-4 mb-8 text-white text-4xl text-center">
                Pick your{" "}
                <span className="text-warning-500 font-semibold">Level</span> &{" "}
                <span className="text-warning-500 font-semibold">Subjects</span>
              </h1>
            )}
          </>
        )}

        {step === 2 && (
          <h1 className="flex flex-col m-4 text-white text-4xl text-center">
            Choose a Secure{" "}
            <span className="text-warning-500 font-semibold">Password</span>
          </h1>
        )}

        {step === 3 && (
          <h1 className="m-4 mb-16 font-bold text-5xl text-center">
            <span className="bg-gradient-to-r from-white to-warning-500 bg-clip-text text-transparent">
              Congratulations
            </span>{" "}
            🎊
          </h1>
        )}

        {ImageNode!}
      </aside>

      <article className="col-span-2 m-3">
        <Card className="w-full h-full">
          <CardHeader className="h-14 flex items-center justify-center">
            <div className="flex item-center justify-center mr-auto">
              <Button
                isIconOnly
                color="primary"
                variant="light"
                className="self-center"
                onClick={() => {
                  if (step == 0) {
                    redirect("/");
                  } else {
                    setStep((prevStep) => prevStep - 1);
                  }
                }}
              >
                <LuArrowLeft className="text-foreground" size={24} />
              </Button>

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
              loading={loading}
              setLoading={setLoading}
            />

            <ProgressBar progress={step} loading={loading} />
          </CardBody>
        </Card>
      </article>
    </section>
  );
}

export default SignUp;
