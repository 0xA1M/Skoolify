"use client";
/* Utils */
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

/* Components */
import {
  Avatar,
  Badge,
  Card,
  CardHeader,
  CardBody,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";
import { LuArrowLeft } from "react-icons/lu";

function AddTeacher() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormState] = useState<{
    [key: string]: string;
  }>({});

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
    {
      label: "English",
      value: "english",
    },
    {
      label: "Arabic",
      value: "arabic",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let { name, value } = e.target;

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* Append the data to the FormData stateful variable */
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(formData);

    router.push("/dashboard/teachers");
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="p-8 flex items-center justify-between">
        {Object.keys(formData).length === 0 ? (
          <>
            <Button
              as={Link}
              href="/dashboard/teachers"
              isIconOnly
              variant="shadow"
              color="primary"
              onPress={onOpen}
            >
              <LuArrowLeft className="text-white" size={24} />
            </Button>
          </>
        ) : (
          <>
            <Button
              isIconOnly
              variant="shadow"
              color="primary"
              onPress={onOpen}
            >
              <LuArrowLeft className="text-white" size={24} />
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="text-danger text-xl flex flex-col gap-1">
                      Confirmation
                    </ModalHeader>
                    <ModalBody>
                      <p className="text-md">
                        Are you sure you want to discard your changes
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        No
                      </Button>
                      <Button
                        as={Link}
                        href="/dashboard/teachers"
                        color="primary"
                        onPress={onClose}
                      >
                        Yes
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </>
        )}

        <h1 className="text-4xl mx-auto text-primary-500 font-semibold drop-shadow-lg">
          Add Teacher
        </h1>
      </CardHeader>

      <CardBody className="w-full grid grid-cols-1 grid-rows-3 gap-24">
        <div className="justify-self-center">
          <Badge
            as={Button}
            isIconOnly={true}
            placement="bottom-right"
            size="lg"
            shape="circle"
            aria-label="Edit Avatar"
            content={<FiEdit size={24} />}
            className="w-12 h-12"
          >
            <Avatar
              as={Button}
              color="primary"
              showFallback
              src={formData.profilePic}
              className="w-52 h-52 text-lg"
            />
          </Badge>
        </div>

        <form
          onSubmit={onSubmit}
          className="w-7/12 row-span-2 flex flex-col items-center justify-self-center gap-6 mt-8"
        >
          <div className="w-full flex flex-row gap-6">
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

          <div className="w-full flex flex-row gap-6">
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

          <div className="w-full grid grid-cols-4 grid-rows-1 gap-6">
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
              className="w-full"
            >
              <SelectItem key="male" value="male">
                Male
              </SelectItem>

              <SelectItem key="female" value="female">
                Female
              </SelectItem>
            </Select>

            <Select
              label="Subject(s)"
              isRequired
              name="subjects"
              selectionMode="multiple"
              value={formData.subjects}
              onChange={handleInputChange}
              className="w-full text-sm"
            >
              {subjects.map((subject, _) => (
                <SelectItem key={subject.value} value={subject.value}>
                  {subject.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <Button
            type="submit"
            variant="shadow"
            color="primary"
            size="lg"
            className="text-xl p-4 px-6 mt-4"
          >
            <p>Add</p>
            <IoAddCircleOutline size={25} />
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}

export default AddTeacher;
