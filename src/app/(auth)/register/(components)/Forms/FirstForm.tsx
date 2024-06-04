/* Utils */
import { FormEvent, useState } from "react";

/* Components */
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import Link from "next/link";

/* Assets */
import { FcGoogle } from "react-icons/fc";
import { RxRocket } from "react-icons/rx";

/* Types */
import { FormProps } from "../Form";

/* First Form: This will retrieve all of the details of the client */
function FirstForm({ setStep, setFormData }: FormProps) {
  const [formData, setFormState] = useState<{ [key: string]: string }>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    gender: "",
    role: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let { name, value } = e.target;

    if (name == "customRole") {
      name = "role";
    }

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* Append the data to the FormData stateful variable */
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStep((prevStepCount) => prevStepCount + 1);

    setFormData((prevData) => {
      return {
        ...prevData,
        ...formData,
      };
    });
  };

  return (
    <>
      <article className="flex flex-col items-center justify-center m-2 mb-4 gap-2">
        <h1 className="text-3xl font-medium mb-2">Create Account</h1>
        <Button
          variant="solid"
          size="lg"
          className="text-white bg-[#152259] rounded-md flex items-center text-lg py-2 px-4 font-medium gap-2 cursor-pointer mb-1"
        >
          <FcGoogle />
          Signup with Google
        </Button>
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
            value={formData.firstName}
            onChange={handleInputChange}
            isRequired
            autoFocus
            className="w-full"
          />

          <Input
            label="Last Name"
            placeholder="Smith"
            type="text"
            value={formData.lastName}
            onChange={handleInputChange}
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
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            isRequired
            className="w-full"
          />

          <Input
            label="Email"
            placeholder="John@smith.com"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
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
            value={formData.phone}
            onChange={handleInputChange}
            name="phone"
            isRequired
            className="w-full col-span-2"
          />

          <Select
            label="Gender"
            isRequired
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <SelectItem key="male" value="male">
              Male
            </SelectItem>

            <SelectItem key="female" value="female">
              Female
            </SelectItem>
          </Select>

          <Select
            label="Role"
            isRequired
            name="customRole"
            value={formData.role}
            onChange={handleInputChange}
          >
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
          variant="solid"
          color="primary"
          className="m-4 py-6 px-8 mt-10 md:mt-0 font-semibold"
          size="lg"
        >
          Sign Up
          <RxRocket size={22} />
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
