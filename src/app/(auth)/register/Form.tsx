"use client";
/* Utils */
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";

/* Components */
import { FcGoogle } from "react-icons/fc";
import {
  Button,
  Input,
  Select,
  SelectSection,
  SelectItem,
  Card,
  CardBody,
} from "@nextui-org/react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

/* Custom Components */
const FirstForm = ({ setStep, setFormData }: FormProps) => {
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
};

const SecondForm = ({ formData, setStep, setFormData }: FormProps) => {
  const [levels, setLevels] = useState<string[]>([]);
  const [levelSubjects, setLevelSubjects] = useState<string[]>([]);

  const handleSelectLevels = (event: ChangeEvent<HTMLSelectElement>) => {
    setLevels(event.target.value.split(","));
  };

  const handleSelectLevelSubjects = (event: ChangeEvent<HTMLSelectElement>) => {
    setLevelSubjects(event.target.value.split(","));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStep((prevStepCount) => prevStepCount + 1);

    const data: { [key: string]: string | string[] } = {
      level: levels,
      subjects: levelSubjects,
    };

    setFormData((prevData) => {
      return {
        ...prevData,
        ...data,
      };
    });
  };

  const educationLvl = [
    {
      education: "AS",
      levels: [
        {
          label: "1AS",
          value: "1as",
        },
        {
          label: "2AS",
          value: "2as",
        },
        {
          label: "3AS",
          value: "3as",
        },
      ],
    },
    {
      education: "AM",
      levels: [
        {
          label: "1AM",
          value: "1am",
        },
        {
          label: "2AM",
          value: "2am",
        },
        {
          label: "3AM",
          value: "3am",
        },
      ],
    },
  ];

  const subjects = [
    {
      label: "Math",
      value: "math",
    },
    {
      label: "Physics",
      value: "physics",
    },
    {
      label: "Science",
      value: "science",
    },
  ];

  return (
    <>
      <form
        onSubmit={onSubmit}
        className={`w-full ${
          formData?.role == "teacher" ? "h-full lg:h-5/6" : "h-unit-7xl"
        } flex flex-col items-center ${
          formData?.role == "teacher" ? "" : "justify-center"
        } lg:gap-4`}
      >
        {formData?.role == "teacher" && (
          <div className="w-full flex items-center justify-center flex-col">
            <h1 className="text-2xl lg:text-3xl text-center">
              👋 Hello Dear Teacher!
            </h1>

            <div className="w-unit-6xl lg:px-6 flex items-center justify-center m-6">
              <Select
                label="Choose the levels you want to teach"
                labelPlacement="outside"
                placeholder="Level"
                isRequired
                selectionMode="multiple"
                name="level"
                onChange={handleSelectLevels}
                className="w-full text-center"
              >
                {educationLvl.map((level, _) => (
                  <SelectSection key={level.education} title={level.education}>
                    {level.levels.map((level, _) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectSection>
                ))}
              </Select>
            </div>

            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-1 p-8 gap-8 gap-y-8 lg:gap-y-14">
              {levels[0] != "" &&
                levels.map((level, _) => (
                  <Select
                    label={`Choose the subject your want to teach ${level.toUpperCase()}`}
                    labelPlacement="outside"
                    placeholder="Math"
                    isRequired
                    selectionMode="multiple"
                    name={`level${level.toUpperCase()}`}
                    onChange={handleSelectLevelSubjects}
                    key={level}
                    className="text-center"
                  >
                    {subjects.map((subject, _) => (
                      <SelectItem key={subject.value} value={subject.value}>
                        {subject.label}
                      </SelectItem>
                    ))}
                  </Select>
                ))}
            </div>
          </div>
        )}

        {formData?.role == "student" && (
          <>
            <h1 className="text-4xl lg:text-5xl text-center my-24 lg:my-0">
              👋 Hello Dear Student!
            </h1>

            <div className="w-9/12 h-full flex flex-col lg:flex-row items-center justify-between p-8 gap-8">
              <Select
                label="Choose the levels you want to teach"
                labelPlacement="outside"
                placeholder="Level"
                isRequired
                name="level"
                onChange={handleSelectLevels}
                className="w-full text-center"
              >
                {educationLvl.map((level, _) => (
                  <SelectSection key={level.education} title={level.education}>
                    {level.levels.map((level, _) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectSection>
                ))}
              </Select>

              {levels.map((level, _) => (
                <Select
                  label={`Choose the subject your want to teach ${level.toUpperCase()}`}
                  labelPlacement="outside"
                  placeholder="Math"
                  isRequired
                  selectionMode="multiple"
                  name={`level${level.toUpperCase()}`}
                  onChange={handleSelectLevelSubjects}
                  key={level}
                  className="text-center"
                >
                  {subjects.map((subject, _) => (
                    <SelectItem key={subject.value} value={subject.value}>
                      {subject.label}
                    </SelectItem>
                  ))}
                </Select>
              ))}
            </div>
          </>
        )}

        <Button
          type="submit"
          variant="shadow"
          color="primary"
          className="py-6 px-8"
          size="lg"
        >
          Next
        </Button>

        <div className="p-8 lg:hidden"></div>
      </form>
    </>
  );
};

const ThirdForm = ({ formData, setStep, setFormData }: FormProps) => {
  const [passMatch, setPassMatch] = useState<boolean>(true);
  const [passLen, setPassLen] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStep((prevStepCount) => prevStepCount + 1);

    const password = event.currentTarget.password.value;
    const confPassword = event.currentTarget.confPassword.value;

    if (password != confPassword) {
      setPassMatch(false);
      setStep(2);
      return;
    } else {
      if (password.length < 8) {
        setPassLen(false);
        setStep(2);
        return;
      }
    }

    const data: { [key: string]: string | string[] } = {
      password,
    };

    setFormData((prevData) => {
      return {
        ...prevData,
        ...data,
      };
    });

    submitData();
  };

  async function submitData() {
    const data: string = JSON.stringify(formData);

    console.log(data);
  }

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
                  <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <Eye className="text-2xl text-default-400 pointer-events-none" />
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
};

const ForthForm = () => {
  return (
    <>
      <Card className="w-full mt-8 p-4 lg:p-8 h-full lg:h-4/6 ">
        <CardBody className="w-full h-full flex items-center justify-center gap-12">
          <div className="w-full flex flex-col justify-center items-start">
            <h1 className="text-3xl ml-6 mb-4">Registration Successful!</h1>
            <p className="text-lg">
              Thank you for registering with us. Your account has been created
              successfully.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h2 className="self-start text-2xl  ml-6 mb-4">
              What&apos;s Next?
            </h2>
            <p className="text-lg lg:indent-10 lg:px-4">
              Our team will now review the information you provided. This
              process usually takes 24 hours. Once your account is approved, you
              will receive a confirmation email at the address you provided
              during registration. If you have any urgent inquiries or need
              assistance, feel free to contact us at{" "}
              <span className="italic">contact@skoolify.com</span>. Thank you
              for choosing <span>SKOOLIFY</span>!
            </p>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

/* Types */
export type FormDataType = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: number;
  gender: string;
  role: string;
  level: string | string[];
  subjects: string[];
  password: string;
};

interface FormProps {
  step?: number;
  formData?: FormDataType;
  setStep: Dispatch<SetStateAction<number>>;
  setFormData: Dispatch<SetStateAction<FormDataType>>;
}

function Form({ formData, step, setStep, setFormData }: FormProps) {
  switch (step) {
    case 0:
      return <FirstForm setStep={setStep} setFormData={setFormData} />;
    case 1:
      return (
        <SecondForm
          formData={formData}
          setStep={setStep}
          setFormData={setFormData}
        />
      );
    case 2:
      return (
        <ThirdForm
          formData={formData}
          setStep={setStep}
          setFormData={setFormData}
        />
      );
    case 3:
      return <ForthForm />;
  }
}

export default Form;
