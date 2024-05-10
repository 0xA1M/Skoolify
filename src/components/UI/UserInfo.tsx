"use client";
/* Utils */
import { useState } from "react";

/* Components */
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Chip,
  useDisclosure,
} from "@nextui-org/react";
import { FaFingerprint } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { CiCircleInfo, CiPhone } from "react-icons/ci";
import { TbBooks } from "react-icons/tb";
import { GiMaterialsScience } from "react-icons/gi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FiEdit } from "react-icons/fi";

/* Custom Components */

import EditPopUp from "./EditPopUp";

/* Type */
import type { User } from "./UsersGrid";

interface Props {
  user: User;
  enrolled: boolean;
}


function UserInfo({ user, enrolled }: Props) {
  const [editPanel, setEditPanel] = useState<boolean>(false);
  console.log(user)
  if (user) {
    return (
      <>
        <Card className="col-span-2 row-span-6 col-start-5 row-start-1 px-3 pb-1">
          <CardHeader className="flex flex-col justify-center items-center gap-1.5">
            <div className="w-full flex">
              <Avatar
                showFallback
                src={user.profilePic}
                className="w-24 h-24 text-large mx-auto"
                color="primary"
              />

              {enrolled && (
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  aria-label="edit"
                  color="primary"
                  className="-ml-8"
                  onClick={() => setEditPanel(!editPanel)}
                >
                  <FiEdit size={24} className="text-foreground" />
                </Button>
              )}
            </div>

            <div className="text-center">
              <h1 className="text-lg mb-2">{user.fullName}</h1>

              <Chip size="md" radius="sm" variant="flat">
                <div className="flex gap-2 items-center justify-between">
                  <FaFingerprint />
                  <p>{user.id}</p>
                </div>
              </Chip>
            </div>
          </CardHeader>

          <Divider />

          <CardBody className="flex flex-col items-center gap-4">
            <Card key="details" className="w-full h-[16rem] p-2 ">
              <CardHeader className="flex items-center justify-between">
                <h3>Contact Details</h3>
                <CiCircleInfo size={24} />
              </CardHeader>

              <Divider />

              <CardBody className="overflow-hidden">
                <p className="p-2 flex items-center gap-2">
                  <span className="flex gap-1">
                    <IoMailOutline size={22} />
                    Email
                  </span>

                  <Chip size="md" radius="sm" variant="flat">
                    <p className="text-medium tracking-wide">{user.email}</p>
                  </Chip>
                </p>

                <p className="p-2 flex items-center gap-2">
                  <span className="flex gap-1">
                    <CiPhone size={22} strokeWidth={0.5} />
                    Phone
                  </span>

                  <Chip size="md" radius="sm" variant="flat">
                    <p className="text-medium tracking-wide">{user.phone}</p>
                  </Chip>
                </p>
              </CardBody>
            </Card>

            <Card key={user.role} className="w-full h-full p-2">
              <CardHeader className="flex items-center justify-between">
                <h3 className="flex items-center gap-3">
                  {user.role}
                  {user.role === "Student" && (
                    <Chip size="md" radius="sm" variant="flat" color="primary">
                      {user.levels && user.levels[0]}
                    </Chip>
                  )}
                </h3>

                <TbBooks size={24} />
              </CardHeader>

              <Divider />

              <CardBody className="px-0 overflow-hidden gap-2">
                {user.role === "Teacher" ? (
                  <Card className="p-2 mx-3">
                    <CardHeader className="flex items-center gap-1">
                      <LiaChalkboardTeacherSolid size={22} />
                      Teaches
                    </CardHeader>

                    <Divider />

                    <CardBody
                      aria-label="Levels"
                      className="flex flex-col gap-2"
                    >
                      {user.levels?.map((level, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <Chip
                            key={index}
                            size="md"
                            radius="sm"
                            variant="flat"
                            color="primary"
                          >
                            {level}
                          </Chip>

                          <Chip
                            key={`Group-${index}`}
                            size="md"
                            radius="sm"
                            variant="flat"
                          >
                            {user.subjects && user.subjects[index].group}
                          </Chip>

                          <Chip
                            key={`Subject-${index}`}
                            size="md"
                            radius="sm"
                            variant="flat"
                            color="secondary"
                          >
                            {user.subjects && user.subjects[index].subject}
                          </Chip>
                        </div>
                      ))}
                    </CardBody>
                  </Card>
                ) : (
                  <Card className="p-2 mx-3">
                    <CardHeader className="flex items-center gap-1">
                      <GiMaterialsScience size={22} />
                      Subjects
                    </CardHeader>

                    <Divider />

                    <CardBody
                      aria-label="Subjects"
                      className="flex flex-col gap-2"
                    >
                      {user.subjects?.map((obj, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <Chip
                            key={`${obj.group}-${index}`}
                            size="md"
                            color="secondary"
                            radius="sm"
                            variant="flat"
                          >
                            {obj.group}
                          </Chip>

                          <Chip
                            key={`${obj.subject}-${index}`}
                            size="md"
                            radius="sm"
                            variant="flat"
                          >
                            {obj.subject}
                          </Chip>

                          {obj.sessions !== undefined && (
                            <Chip
                              key={`${obj.sessions}-${index}`}
                              size="md"
                              color={
                                obj.sessions && obj.sessions >= 3
                                  ? "success"
                                  : obj.sessions === 2 || obj.sessions === 1
                                  ? "warning"
                                  : "danger"
                              }
                              radius="sm"
                              variant="flat"
                            >
                              Sessions {obj.sessions}
                            </Chip>
                          )}
                        </div>
                      ))}
                    </CardBody>
                  </Card>
                )}
              </CardBody>
            </Card>
          </CardBody>
        </Card>

        <EditPopUp
          user={user}
          editPanel={editPanel}
          setEditPanel={setEditPanel}
        />
      </>
    );
  }

  return (
    <Card className="col-span-2 row-span-6 col-start-5 row-start-1 p-4">
      <CardBody></CardBody>
    </Card>
  );
}

export default UserInfo;
