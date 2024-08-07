"use client";
/* Utils */
import { useState, useRef, Dispatch, SetStateAction, ChangeEvent } from "react";

/* Components */
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  chip,
  Input,
  Spinner,
} from "@nextui-org/react";
import { IoIosCheckmark, IoIosCloseCircleOutline } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";
import { HiOutlineXMark } from "react-icons/hi2";
import { IoMailOutline, IoAddCircleOutline } from "react-icons/io5";
import { CiCircleInfo, CiPhone } from "react-icons/ci";
import { HiIdentification } from "react-icons/hi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { GiMaterialsScience } from "react-icons/gi";

/* Types */
import type { User } from "./UsersGrid";

interface Props {
  user: User;
  editPanel: boolean;
  setEditPanel: Dispatch<SetStateAction<boolean>>;
}

function EditPopUp({ user, editPanel, setEditPanel }: Props) {
  const [edit, setEdit] = useState<string>("");
  const [levels, setLevels] = useState<string[]>(user.levels!);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subjects, setSubjects] = useState<
    {
      subject: string;
      group: string;
      sessions?: number | undefined;
    }[] // parse and stringify are used to copy the object and not referencing it
  >(JSON.parse(JSON.stringify(user.subjects || [])));
  const [values, setValues] = useState<{ name: string; value: string }[]>([]);
  const [fullName, setFullName] = useState<string>(user.fullName);
  const [email, setEmail] = useState<string>(user.email);
  const [phone, setPhone] = useState<string>(user.phone);
  const fullNameChipValRef = useRef<HTMLParagraphElement>(null);
  const emailChipValRef = useRef<HTMLParagraphElement>(null);
  const phoneChipValRef = useRef<HTMLParagraphElement>(null);

  const handleTextEdit = (e: any) => {
    const target: string = e.currentTarget.name;

    setEdit(target);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const data = { name, value };

    // Find the index of the existing data object with the same name
    const existingIndex = values.findIndex((item) => item.name === name);

    setValues((prevValues) => {
      if (existingIndex !== -1) {
        // Update the existing data object
        return [
          ...prevValues.slice(0, existingIndex),
          { ...data },
          ...prevValues.slice(existingIndex + 1),
        ];
      } else {
        // Add the new data object
        return [...prevValues, data];
      }
    });
  };

  const handleRemoveLevel = (e: any) => {
    const levelToRemove = e.currentTarget.name;
    const index = levels.findIndex((level) => level == levelToRemove);
    const subjectToRemove = subjects[index];

    setLevels(levels?.filter((level) => level != levelToRemove));
    setSubjects(
      subjects.filter((obj: any) => obj.subject != subjectToRemove.subject)
    );
  };

  const handleRemoveSubject = (e: any) => {
    const subjectToRemove = e.currentTarget.name;

    setSubjects(subjects.filter((obj: any) => obj.subject != subjectToRemove));
  };

  const handleInput = () => {
    values.forEach((data) => {
      const nameParts: string[] = data.name.split("-");

      if (nameParts[0] === "Level" && levels) {
        levels[parseInt(nameParts[1])] = data.value; // Update level value
      } else if (subjects) {
        const subjectIndex = parseInt(nameParts[1]);
        // Check if subject exists at the index before updating
        if (subjects[subjectIndex]) {
          subjects[subjectIndex] = {
            ...subjects[subjectIndex],
            [nameParts[0].toLowerCase()]: data.value, // Use dynamic key
          };
        }
      }
    });

    setEdit("");
  };

  const addDetail = () => {
    setEdit("details");

    if (user.role === "Teacher") {
      setLevels((levels) => [...levels, ""]);
      setSubjects((subjects: any) => [
        ...subjects,
        {
          subject: "",
          group: "",
        },
      ]);
    } else if (user.role === "Student") {
      setSubjects((subjects: any) => [
        ...subjects,
        {
          subject: "",
          group: "",
          sessions: 4,
        },
      ]);
    }
  };

  /* Update the user's data */
  const handleSubmitEdit = async (e: any) => {
    setIsLoading(true);
    user.fullName = fullName;
    user.email = email;
    user.phone = phone;
    user.levels = levels;
    user.subjects = subjects;
    const data = {
      id: user.id,
      std: {
        username: user.fullName,
        email: user.email,
        phone_number: user.phone,
        level: user.levels[0],
        modules_Groups_sessionNumber: user.subjects,
      },
    };
    console.log(user);
    console.log(data);
    const response = await fetch(`http://localhost:3000/api/updateStudent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <Modal
      isDismissable={false}
      isKeyboardDismissDisabled
      placement="center"
      backdrop="blur"
      hideCloseButton
      shadow="lg"
      size="2xl"
      isOpen={editPanel}
      onOpenChange={() => setEditPanel(!editPanel)}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Edit {user.role}&apos;s data</ModalHeader>

            <ModalBody>
              {/* User's Details Editor */}
              <Card className="py-2 px-4">
                <CardHeader className="flex items-center justify-between">
                  <h2>{user.role}&apos;s details</h2>

                  <CiCircleInfo size={24} />
                </CardHeader>

                <Divider />

                <CardBody>
                  {/* Username Editor */}
                  <div className="p-2 flex items-center gap-2">
                    <p className="flex gap-1">
                      <HiIdentification size={22} />
                      Name
                    </p>

                    <div className="w-full flex items-center gap-2">
                      <Chip
                        size="lg"
                        radius="sm"
                        variant="flat"
                        color={edit === "fullName" ? "primary" : "default"}
                        className="ml-7 px-[2.35rem] transition-background duration-100 ease-in-out"
                      >
                        <p
                          className="text-medium tracking-wide outline-none"
                          ref={fullNameChipValRef}
                          contentEditable={edit === "fullName"}
                        >
                          {user.fullName}
                        </p>
                      </Chip>

                      {edit === "fullName" ? (
                        <>
                          <Button
                            isIconOnly
                            variant="light"
                            size="sm"
                            color="success"
                            onClick={() => {
                              if (fullNameChipValRef.current)
                                setFullName(
                                  fullNameChipValRef.current?.innerText
                                );

                              setEdit("");
                            }}
                          >
                            <IoIosCheckmark size={64} strokeWidth={0.5} />
                          </Button>

                          <Button
                            isIconOnly
                            variant="light"
                            size="sm"
                            color="danger"
                            onClick={() => {
                              if (fullNameChipValRef.current)
                                fullNameChipValRef.current.innerText =
                                  user.fullName;
                              setFullName(user.fullName);

                              setEdit("");
                            }}
                          >
                            <HiOutlineXMark size={22} />
                          </Button>
                        </>
                      ) : (
                        <Button
                          isIconOnly
                          variant="light"
                          size="sm"
                          color="primary"
                          name="fullName"
                          onClick={handleTextEdit}
                        >
                          <MdOutlineModeEdit
                            size={22}
                            className="text-foreground"
                          />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Email Editor */}
                  <div className="p-2 flex items-center gap-2">
                    <p className="flex gap-1">
                      <IoMailOutline size={22} />
                      Email
                    </p>

                    <div className="w-full flex items-center gap-2">
                      <Chip
                        size="lg"
                        radius="sm"
                        variant="flat"
                        color={edit === "email" ? "primary" : "default"}
                        className="ml-8 transition-background duration-100 ease-in-out"
                      >
                        <p
                          className="text-medium tracking-wide outline-none"
                          ref={emailChipValRef}
                          contentEditable={edit === "email"}
                        >
                          {user.email}
                        </p>
                      </Chip>

                      {edit === "email" ? (
                        <>
                          <Button
                            isIconOnly
                            variant="light"
                            size="sm"
                            color="success"
                            onClick={() => {
                              if (emailChipValRef.current)
                                setEmail(emailChipValRef.current?.innerText);

                              setEdit("");
                            }}
                          >
                            <IoIosCheckmark size={64} strokeWidth={0.5} />
                          </Button>

                          <Button
                            isIconOnly
                            variant="light"
                            size="sm"
                            color="danger"
                            onClick={() => {
                              if (emailChipValRef.current)
                                emailChipValRef.current.innerText = user.email;
                              setEmail(user.email);

                              setEdit("");
                            }}
                          >
                            <HiOutlineXMark size={22} />
                          </Button>
                        </>
                      ) : (
                        <Button
                          isIconOnly
                          variant="light"
                          size="sm"
                          color="primary"
                          name="email"
                          onClick={handleTextEdit}
                        >
                          <MdOutlineModeEdit
                            size={22}
                            className="text-foreground"
                          />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Phone Editor */}
                  <div className="p-2 flex items-center gap-2">
                    <p className="flex gap-1">
                      <CiPhone size={22} strokeWidth={0.5} />
                      Phone
                    </p>

                    <div className="w-full flex items-center gap-2">
                      <Chip
                        size="lg"
                        radius="sm"
                        variant="flat"
                        color={edit === "phone" ? "primary" : "default"}
                        className="ml-[1.6rem] px-5 transition-background duration-100 ease-in-out"
                      >
                        <p
                          className="text-medium tracking-wide outline-none"
                          ref={phoneChipValRef}
                          contentEditable={edit === "phone"}
                        >
                          {user.phone}
                        </p>
                      </Chip>

                      {edit === "phone" ? (
                        <>
                          <Button
                            isIconOnly
                            variant="light"
                            size="sm"
                            color="success"
                            onClick={() => {
                              if (phoneChipValRef.current)
                                setPhone(phoneChipValRef.current?.innerText);

                              setEdit("");
                            }}
                          >
                            <IoIosCheckmark size={64} strokeWidth={0.5} />
                          </Button>

                          <Button
                            isIconOnly
                            variant="light"
                            size="sm"
                            color="danger"
                            onClick={() => {
                              if (phoneChipValRef.current)
                                phoneChipValRef.current.innerText = user.phone;
                              setPhone(user.phone);

                              setEdit("");
                            }}
                          >
                            <HiOutlineXMark size={22} />
                          </Button>
                        </>
                      ) : (
                        <Button
                          isIconOnly
                          variant="light"
                          size="sm"
                          color="primary"
                          name="phone"
                          onClick={handleTextEdit}
                        >
                          <MdOutlineModeEdit
                            size={22}
                            className="text-foreground"
                          />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* User's Specific Role Details */}
              <Card className="py-2 px-4">
                <CardHeader className="flex items-center justify-between">
                  <h2>{user.role}&apos;s details</h2>

                  <CiCircleInfo size={24} />
                </CardHeader>

                <Divider />

                <CardBody>
                  <div className="flex items-center justify-between px-2 mb-4">
                    {/* Edit Button */}
                    {user.role === "Teacher" ? (
                      <p className="w-full text-lg flex gap-1">
                        <LiaChalkboardTeacherSolid size={26} />
                        Teaches
                      </p>
                    ) : (
                      <p className="w-full text-lg  flex  gap-1">
                        <GiMaterialsScience size={26} />
                        Subjects
                      </p>
                    )}

                    {edit === "details" ? (
                      <>
                        {/* Edit Current Detail */}
                        <Button
                          isIconOnly
                          variant="light"
                          size="sm"
                          color="success"
                          onClick={handleInput}
                        >
                          <IoIosCheckmark size={64} strokeWidth={0.5} />
                        </Button>

                        {/* Cancel Edit Current Detail */}
                        <Button
                          isIconOnly
                          variant="light"
                          size="sm"
                          color="danger"
                          onClick={() => {
                            setEdit("");
                          }}
                        >
                          <HiOutlineXMark size={22} />
                        </Button>
                      </>
                    ) : (
                      <Button
                        isIconOnly
                        variant="light"
                        color="primary"
                        onClick={() => setEdit("details")}
                      >
                        <MdOutlineModeEdit size={25} />
                      </Button>
                    )}

                    {/* Add Button */}
                    <Button
                      isIconOnly
                      variant="light"
                      color="primary"
                      onClick={addDetail}
                    >
                      <IoAddCircleOutline size={26} />
                    </Button>
                  </div>

                  {user.role === "Teacher" ? (
                    <div className="mx-auto grid grid-cols-2 grid-rows-1 gap-4">
                      {levels?.map((level, index) => (
                        <div
                          key={index}
                          className="flex items-center border-1.5 rounded-md p-1"
                        >
                          {edit === "details" ? (
                            <div className="flex gap-2 p-2 items-center">
                              <Input
                                key={index}
                                size="sm"
                                name={`Level-${index}`}
                                radius="sm"
                                color="primary"
                                variant="bordered"
                                defaultValue={level}
                                onChange={handleInputChange}
                              />

                              <Input
                                key={`Group-${index}`}
                                name={`Group-${index}`}
                                size="sm"
                                color="primary"
                                radius="sm"
                                variant="bordered"
                                defaultValue={subjects && subjects[index].group}
                                onChange={handleInputChange}
                              />

                              <Input
                                key={`Subject-${index}`}
                                name={`Subject-${index}`}
                                size="sm"
                                radius="sm"
                                color="primary"
                                variant="bordered"
                                defaultValue={
                                  subjects && subjects[index].subject
                                }
                                onChange={handleInputChange}
                              />
                            </div>
                          ) : (
                            <div className="flex gap-2 p-2 items-center">
                              <Chip
                                key={index}
                                size="md"
                                radius="sm"
                                variant="bordered"
                                className="border-primary-500 outline-none"
                              >
                                {level}
                              </Chip>

                              <Chip
                                key={`Group-${index}`}
                                size="md"
                                radius="sm"
                                variant="bordered"
                                className="border-primary-500 outline-none"
                              >
                                {subjects && subjects[index]?.group}
                              </Chip>

                              <Chip
                                key={`Subject-${index}`}
                                size="md"
                                radius="sm"
                                variant="bordered"
                                className="border-primary-500 outline-none"
                              >
                                {subjects && subjects[index].subject}
                              </Chip>
                            </div>
                          )}

                          {edit !== "details" && (
                            <Button
                              isIconOnly
                              size="sm"
                              name={level}
                              variant="light"
                              color="danger"
                              className="ml-auto"
                              onClick={handleRemoveLevel}
                            >
                              <IoIosCloseCircleOutline size={24} />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Role === Student */
                    <div className="mx-auto grid grid-cols-2 grid-rows-1 gap-4">
                      {subjects?.map((obj, index) => (
                        <div
                          key={index}
                          className="flex items-center border-1.5 rounded-md p-1"
                        >
                          {edit === "details" ? (
                            <div className="flex gap-2 p-2 items-center">
                              <Input
                                key={index}
                                size="sm"
                                name={`Group-${index}`}
                                radius="sm"
                                color="primary"
                                variant="bordered"
                                defaultValue={obj.group}
                                onChange={handleInputChange}
                              />

                              <Input
                                key={`Subject-${index}`}
                                name={`Subject-${index}`}
                                size="sm"
                                color="primary"
                                radius="sm"
                                variant="bordered"
                                defaultValue={obj.subject}
                                onChange={handleInputChange}
                              />

                              <Input
                                key={`Sessions-${index}`}
                                name={`Sessions-${index}`}
                                size="sm"
                                radius="sm"
                                color="primary"
                                variant="bordered"
                                defaultValue={`${obj.sessions}`}
                                onChange={handleInputChange}
                              />
                            </div>
                          ) : (
                            <div className="flex gap-2 p-2 items-center">
                              <Chip
                                key={index}
                                size="md"
                                radius="sm"
                                variant="bordered"
                                className="border-primary-500 outline-none"
                              >
                                {obj.group}
                              </Chip>

                              <Chip
                                key={`Subject-${index}`}
                                size="md"
                                radius="sm"
                                variant="bordered"
                                className="border-primary-500 outline-none"
                              >
                                {obj.subject}
                              </Chip>

                              <Chip
                                key={`Sessions-${index}`}
                                size="md"
                                radius="sm"
                                color={
                                  obj.sessions && obj.sessions >= 3
                                    ? "success"
                                    : obj.sessions === 2 || obj.sessions === 1
                                    ? "warning"
                                    : "danger"
                                }
                                variant="bordered"
                                className="outline-none"
                              >
                                {obj.sessions}
                              </Chip>
                            </div>
                          )}

                          {edit !== "details" && (
                            <Button
                              isIconOnly
                              size="sm"
                              name={obj.subject}
                              variant="light"
                              color="danger"
                              className="ml-auto"
                              onClick={handleRemoveSubject}
                            >
                              <IoIosCloseCircleOutline size={24} />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardBody>
              </Card>
            </ModalBody>

            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  !isLoading && onClose();
                  setEdit("");
                  setLevels(user.levels!);
                  setSubjects(user.subjects!);
                }}
              >
                Cancel
              </Button>
              <Button
                color={`${!isLoading ? "primary" : "default"}`}
                variant="shadow"
                onPress={(e: any) => {
                  if (isLoading) {
                    onClose();
                  }
                  setEdit("");
                  handleSubmitEdit(e);
                }}
              >
                {isLoading ? (
                  <Spinner size="sm" color="primary" />
                ) : (
                  <h1>Save</h1>
                )}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default EditPopUp;
