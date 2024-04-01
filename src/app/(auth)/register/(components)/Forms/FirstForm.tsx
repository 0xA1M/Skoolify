/* Utils */
import { FormEvent } from "react";

/* Components */
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import Link from "next/link";

/* Assets */
import { FcGoogle } from "react-icons/fc";

/* Types */
import { FormProps } from "../Form";

/* First Form: This will retrieve all of the details of the client */
function FirstForm({ setStep, setFormData }: FormProps) {
  /* Append the data to the FormData stateful variable */
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStep((prevStepCount) => prevStepCount + 1);

    const data: { [key: string]: string } = {
      firstName: event.currentTarget.firstName.value,
      lastName: event.currentTarget.lastName.value,
      dateOfBirth: event.currentTarget.dateOfBirth.value,
      email: event.currentTarget.email.value,
      phone: event.currentTarget.phone.value,
      gender: event.currentTarget.gender.value,
      role: event.currentTarget.customRole.value,
    };

    setFormData((prevData) => {
      return {
        ...prevData,
        ...data,
      };
    });
  };

  return (
    <>
      <article className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-medium mb-2">Create Account</h1>
        <Button
          variant="shadow"
          size="lg"
          className="text-white bg-[#152259] rounded-md flex items-center text-lg py-2 px-4 font-medium gap-2 cursor-pointer mb-1"
        >
          <FcGoogle />
          Signup with Google
        </Button>
        <h2 className="font-bold text-2xl">- OR -</h2>
      </article>

      <form
        onSubmit={onSubmit}
        className="w-full h-full flex flex-col items-center"
      >
        <div className="w-full flex flex-col sm:flex-row py-4 px-16 gap-8">
          <Input
            label="First Name"
            placeholder="John"
            type="text"
            name="firstName"
            isRequired
            className="w-full"
          />

          <Input
            label="Last Name"
            placeholder="Smith"
            type="text"
            name="lastName"
            isRequired
            className="w-full"
          />
        </div>

        <div className="w-full flex-col sm:flex-row flex py-4 px-16 gap-8">
          <Input
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            isRequired
            className="w-full"
          />

          <Input
            label="Email"
            placeholder="John@smith.com"
            type="email"
            name="email"
            isRequired
            className="w-full"
          />
        </div>

        <div className="w-full grid grid-cols-2 lg:grid-cols-4 grid-rows-1 py-4 px-16 gap-6 mb-6">
          <Input
            label="Phone Number"
            placeholder="123-456-7890"
            type="tel"
            name="phone"
            isRequired
            className="w-full col-span-2"
          />

          <Select label="Gender" isRequired name="gender">
            <SelectItem key="male" value="male">
              Male
            </SelectItem>

            <SelectItem key="female" value="female">
              Female
            </SelectItem>
          </Select>

          <Select label="Role" isRequired name="customRole">
            <SelectItem key="teacher" value="teacher">
              Teacher
            </SelectItem>

            <SelectItem key="student" value="student">
              Student
            </SelectItem>
          </Select>
        </div>

        <Button
          type="submit"
          variant="shadow"
          color="primary"
          className="m-4 py-6 px-8 mt-10 md:mt-0"
          size="lg"
        >
          Sign Up
        </Button>

        <p>
          Already have an account?{" "}
          <Link href="/login" className="p-1 text-primary">
            Login
          </Link>
        </p>
      </form>
    </>
  );
}

export default FirstForm;
