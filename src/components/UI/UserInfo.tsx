/* Components */
import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Chip,
} from "@nextui-org/react";
import { FaFingerprint } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { CiCircleInfo, CiPhone } from "react-icons/ci";
import { TbBooks } from "react-icons/tb";
import { GiMaterialsScience } from "react-icons/gi";
import { GrGroup } from "react-icons/gr";
import { FaGraduationCap } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

/* Type */
import type { User } from "./UsersGrid";

interface Props {
  user: User;
}

function UserInfo({ user }: Props) {
  if (user) {
    return (
      <Card className="col-span-2 row-span-6 col-start-5 row-start-1 px-3 pb-1">
        <CardHeader className="flex flex-col justify-center items-center gap-1.5">
          <div className="w-full flex">
            <Avatar
              showFallback
              src={user.profilePic}
              className="w-24 h-24 text-large mx-auto"
              color="primary"
            />

            <Button
              isIconOnly
              variant="light"
              size="sm"
              aria-label="edit"
              color="primary"
              className="-ml-8"
            >
              <FiEdit size={24} className="text-foreground" />
            </Button>
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
              <h3> Contact Details</h3>
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
              <h3>{user.role}</h3>
              <TbBooks size={24} />
            </CardHeader>

            <Divider />

            <CardBody className="px-0 overflow-hidden">
              <Accordion
                variant="splitted"
                motionProps={{
                  variants: {
                    enter: {
                      y: 0,
                      opacity: 1,
                      height: "auto",
                      transition: {
                        height: {
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                          duration: 1,
                        },
                        opacity: {
                          easings: "ease",
                          duration: 1,
                        },
                      },
                    },
                    exit: {
                      y: -10,
                      opacity: 0,
                      height: 0,
                      transition: {
                        height: {
                          easings: "ease",
                          duration: 0.25,
                        },
                        opacity: {
                          easings: "ease",
                          duration: 0.3,
                        },
                      },
                    },
                  },
                }}
              >
                <AccordionItem
                  key="1"
                  aria-label="Levels"
                  title={
                    <p className="flex items-center">
                      <span className="flex gap-1">
                        <FaGraduationCap size={22} />
                        Levels
                      </span>
                    </p>
                  }
                >
                  <div className="flex flex-wrap gap-2 items-center">
                    {user.levels?.map((level, index) => (
                      <Chip key={index} size="md" radius="sm" variant="flat">
                        {level}
                      </Chip>
                    ))}
                  </div>
                </AccordionItem>

                <AccordionItem
                  key="2"
                  aria-label="Subjects"
                  title={
                    <p className="flex items-center">
                      <span className="flex gap-1">
                        <GiMaterialsScience size={22} />
                        Subjects
                      </span>
                    </p>
                  }
                >
                  <div className="flex flex-wrap gap-2 items-center">
                    {user.subjects?.map((subject, index) => (
                      <Chip key={index} size="md" radius="sm" variant="flat">
                        {subject}
                      </Chip>
                    ))}
                  </div>
                </AccordionItem>

                <AccordionItem
                  key="3"
                  aria-label="Groups"
                  title={
                    <p className="flex items-center">
                      <span className="flex gap-1">
                        <GrGroup size={22} />
                        Groups
                      </span>
                    </p>
                  }
                >
                  <div className="flex flex-wrap gap-2 items-center">
                    {user.groups?.map((group, index) => (
                      <Chip key={index} size="md" radius="sm" variant="flat">
                        {group}
                      </Chip>
                    ))}
                  </div>
                </AccordionItem>
              </Accordion>
            </CardBody>
          </Card>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="col-span-2 row-span-6 col-start-5 row-start-1 p-4">
      <CardBody></CardBody>
    </Card>
  );
}

export default UserInfo;
