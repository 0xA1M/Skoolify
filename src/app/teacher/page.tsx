"use client";
/* Utils */
import { useState } from "react";

/* Components */
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Card,
  CardHeader,
  CardBody,
  DropdownTrigger,
  DropdownSection,
  cn,
  Badge,
  User,
} from "@nextui-org/react";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { TbSunMoon } from "react-icons/tb";

/* Custom Components */
import Logo from "@/components/UI/Logo";
import ThemeSwitcher from "@/components/UI/ThemeSwitcher";

function TeacherDashboard() {
  const [notification, setNotification] = useState<number>(0);

  return (
    <Card fullWidth shadow="lg">
      <CardHeader className="flex items-center justify-between h-[4.85rem]">
        <Logo />

        <div className="relative flex items-center gap-2 ml-auto">
          {/* Notification Red Dot */}
          <div
            className={`absolute w-3.5 h-3.5 rounded-full bg-danger-500 -top-[0.1rem] left-[1.6rem] outline-current border-2 border-background pointer-events-none z-50 transition-transform transform ${
              notification ? "scale-100" : "scale-0"
            }`}
          ></div>

          {/* User Menu */}
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                src=""
                color="primary"
                className="transition-transform mx-4"
              />
            </DropdownTrigger>

            <DropdownMenu variant="flat" aria-label="User Info">
              <DropdownSection showDivider>
                <DropdownItem key="user" isReadOnly className="cursor-default">
                  <User
                    name="Guest"
                    description="Welcome, guest!"
                    classNames={{
                      base: "flex flex-col justify-center",
                      wrapper: "flex flex-col justify-center items-center",
                      name: "text-medium",
                    }}
                    avatarProps={{
                      src: "",
                      size: "lg",
                    }}
                  />
                </DropdownItem>
              </DropdownSection>

              <DropdownSection showDivider aria-label="Actions">
                <DropdownItem
                  key="theme"
                  isReadOnly
                  className="cursor-default"
                  startContent={
                    <TbSunMoon className="text-xl text-default-500 pointer-events-none flex-shrink-0" />
                  }
                  endContent={<ThemeSwitcher isDropdown />}
                >
                  Theme
                </DropdownItem>
                <DropdownItem
                  key="notifications"
                  href={"/teacher/notifications"}
                  startContent={
                    notification > 0 ? (
                      <Badge
                        color="danger"
                        content={notification}
                        placement="top-left"
                      >
                        <IoNotificationsOutline className="text-xl text-default-500 pointer-events-none flex-shrink-0" />
                      </Badge>
                    ) : (
                      <IoNotificationsOutline className="text-xl text-default-500 pointer-events-none flex-shrink-0" />
                    )
                  }
                >
                  Notifications
                </DropdownItem>

                <DropdownItem
                  key="settings"
                  href={"/teacher/settings"}
                  startContent={
                    <IoSettingsOutline className="text-xl text-default-500 pointer-events-none flex-shrink-0" />
                  }
                >
                  Settings
                </DropdownItem>
              </DropdownSection>

              <DropdownItem
                key="logout"
                href="/"
                className="text-danger"
                color="danger"
                startContent={
                  <CiLogout
                    className={cn(
                      "text-xl text-danger-500 pointer-events-none flex-shrink-0",
                      "text-danger"
                    )}
                  />
                }
              >
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardHeader>

      <CardBody className="flex items-center justify-center text-5xl">
        Really Soon!
      </CardBody>
    </Card>
  );
}

export default TeacherDashboard;
