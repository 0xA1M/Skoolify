"use client";
/* Utils */
import { FormEvent, useState } from "react";

/* Components */
import { Button, Input } from "@nextui-org/react";

/* Assets */
import { LuEye, LuEyeOff } from "react-icons/lu";

/* Types */
import { FormProps } from "../Form";

/* Third Form: This will retrieve the password set by the client */
function ThirdForm({ formData, setStep, setFormData }: FormProps) {
  const [passMatch, setPassMatch] = useState<boolean>(true);
  const [passLen, setPassLen] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  /* Append the data to the FormData stateful variable */
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const password: string = event.currentTarget.password.value;
    const confPassword: string = event.currentTarget.confPassword.value;

    if (password !== confPassword) {
      setPassMatch(false);

      return;
    } else {
      if (password.length < 8) {
        setPassLen(false);

        return;
      }
    }

    setFormData((prevData) => {
      const newData = {
        ...prevData,
        password,
      };

      return newData;
    });

    setStep((prevStepCount) => prevStepCount + 1);
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="w-full h-5/6 flex flex-col items-center justify-center gap-10 "
      >
        <h1 className="text-2xl mx-auto lg:mx-0 lg:ml-32 self-start lg:text-4xl">
          🔑 Choose a secure password
        </h1>

        <div className="w-10/12 lg:w-6/12 flex flex-col p-4 gap-6 lg:gap-8">
          <Input
            label="Password"
            placeholder="Password"
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
            name="password"
            isRequired
            variant="bordered"
            isInvalid={!passMatch || !passLen}
            color={!passMatch || !passLen ? "danger" : "default"}
            errorMessage={
              (!passMatch && "Password Don't Match") ||
              (!passLen &&
                "Make sure your password is at least 8 characters long")
            }
            className="w-full"
            autoFocus
          />

          <Input
            label="Confirm Password"
            placeholder="Confirm Password"
            type={isVisible ? "text" : "password"}
            name="confPassword"
            isRequired
            variant="bordered"
            isInvalid={!passMatch || !passLen}
            color={!passMatch || !passLen ? "danger" : "default"}
            errorMessage={
              (!passMatch && "Password Don't Match") ||
              (!passLen &&
                "Make sure your password is at least 8 characters long")
            }
            className="w-full"
          />
        </div>

        <Button
          type="submit"
          variant="shadow"
          color="primary"
          className="m-4 py-6 px-8"
          size="lg"
        >
          Next
        </Button>
      </form>
    </>
  );
}

export default ThirdForm;
