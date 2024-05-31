"use client";
/* Utils */
import { useState, useEffect, useContext } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

/* Components */
import {
  Badge,
  Button,
  Card,
  CardBody,
  cn,
  Divider,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
  Image,
  DropdownSection,
} from "@nextui-org/react";
import { Sidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdDashboard } from "react-icons/md";
import {
  FaUsers,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserCheck,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";

/* Custom Components */
import ThemeSwitcher from "./ThemeSwitcher";

/* Assets */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

function SideNavBar() {
  const [collapseMenu, setCollapseMenu] = useState<boolean>(false);
  const [active, setActive] = useState<string>("dashboard");
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [notification, setNotification] = useState<number>(0);
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme } = useTheme();
  const pathname = usePathname();

  let menuItems = [
    {
      title: "Dashboard",
      label: "dashboard",
      link: "/dashboard",
      icon: <MdDashboard size={22} />,
    },
    {
      title: "Staff",
      label: "staff",
      link: "/dashboard/staff",
      icon: <FaUsers size={22} />,
    },
    {
      title: "Teachers",
      label: "teachers",
      link: "/dashboard/teachers",
      icon: <FaChalkboardTeacher size={22} />,
    },
    {
      title: "Students",
      label: "student",
      link: "/dashboard/students",
      icon: <FaUserGraduate size={22} />,
    },
    {
      title: "Check In",
      label: "check-in",
      link: "/dashboard/check-in",
      icon: <FaUserCheck size={22} />,
    },
    {
      title: "Notifications",
      label: "timetable",
      link: "/dashboard/timetable",
      icon: <FaClock size={22} />,
    },
    /* {
      title: "Events",
      label: "events",
      link: "/dashboard/events",
      icon: <FaCalendarAlt size={22} />,
    }, */
  ];

  const toggleCollapseMenu = () => {
    setCollapseMenu((prevState) => !prevState);
  };

  /* To get the smooth name transition effect in the User component */
  useEffect(() => {
    const delay = 100;
    let timer: any;

    if (!collapseMenu) {
      timer = setTimeout(() => {
        setShowDetails(collapseMenu);
      }, delay);
    } else {
      setShowDetails(collapseMenu);
    }

    return () => clearTimeout(timer);
  }, [collapseMenu]);

  /* To get the theme */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* If the theme isn't resolve display a loading skeleton */
  if (!mounted)
    return (
      <Card className="h-full w-[300px]" radius="none">
        <CardBody></CardBody>
      </Card>
    );

  return (
    <Sidebar
      className="h-full shadow-xl"
      transitionDuration={300}
      collapsed={collapseMenu}
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: `${theme === "light" ? "#f8f9fa" : "#0c0c0c"}`,
        },
      }}
    >
      <div className="h-full w-full flex flex-col justify-between p-4">
        {/* Burger Menu */}
        <div className="w-full flex justify-between items-center">
          <Button
            variant="light"
            isIconOnly
            onClick={toggleCollapseMenu}
            color="primary"
          >
            <RxHamburgerMenu size={26} />
          </Button>
        </div>

        {/* Option Menu */}
        <Menu
          className="w-full h-full my-14 mt-18"
          menuItemStyles={{
            button: ({ active }) => {
              let styles: any = {
                width: "100%",
                fontSize: "1.125rem",
                lineHeight: "1.75rem",
                display: "flex",
                padding: "1rem",
                margin: "0.5rem 0",
                justifyContent: "center",
                alignItems: "center",
                transition: "transform 100ms linear, color 100ms linear",
                color: `${theme === "light" ? "#00000099" : "#ffffff99"}`,
                ":hover": {
                  color: `${theme === "light" ? "black" : "white"}`,
                  background: "transparent",
                  transform: "scale(1.1)",
                },
              };

              if (active) {
                styles = {
                  ...styles,
                  transform: "scale(1.1)",
                  color: `${theme === "light" ? "#2F50C1" : "#4169E1"}`,
                  ":hover": {
                    background: "transparent",
                    transform: "scale(1.1)",
                  },
                };
              }

              return styles;
            },
          }}
        >
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              icon={item.icon}
              active={
                item.link === pathname ||
                ((item.label === "teachers" ||
                  item.label === "student" ||
                  item.label === "staff") &&
                  `${item.link}/add` === pathname)
              }
              onClick={() => setActive(item.label)}
              component={<Link href={item.link} />}
            >
              {item.title}
            </MenuItem>
          ))}
        </Menu>

        <Image
          src={
            showDetails
              ? "/Hat.png"
              : theme === "light"
              ? "/LogoLight.png"
              : "/LogoDark.png"
          }
          alt=""
          className={
            showDetails ? "w-[48px] h-[45.836px] mb-[18px]" : "w-auto h-20"
          }
        />

        <Divider className="my-2" />

        <div className="w-full flex items-center relative">
          {/* Notification Red Dot */}
          <div
            className={`absolute w-4 h-4 rounded-full bg-danger-500 -top-0.5 -left-0.5 outline-current border-2 border-background pointer-events-none z-50 transition-transform transform ${
              notification ? "scale-100" : "scale-0"
            }`}
          ></div>

          {/* User Menu */}
          <Dropdown placement="top">
            <DropdownTrigger
              className="p-1.5 flex justify-start items-center shadow-sm"
              style={{
                backgroundColor: `${theme === "light" ? "#fff" : "#0c0c0c"}`,
              }}
            >
              <User
                as="button"
                name={`${showDetails ? "" : "Guest"}`}
                description={`${showDetails ? "" : "Welcome, guest!"}`}
                className="transition-transform -ml-1"
                classNames={{
                  name: `transition-opacity duration-100 ease ${
                    !showDetails ? "opacity-100" : "opacity-0"
                  }`,
                  description: `transition-opacity duration-100 ${
                    !showDetails ? "opacity-100" : "opacity-0"
                  }`,
                }}
                avatarProps={{
                  src: "",
                  showFallback: true,
                  name: "",
                }}
              />
            </DropdownTrigger>

            <DropdownMenu variant="flat" aria-label="Static Actions">
              <DropdownSection showDivider>
                <DropdownItem
                  key="settings"
                  href={"/dashboard/notifications"}
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
                  href={"/dashboard/settings"}
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

          {/* Theme Toggler */}
          <div
            className={`absolute -right-0 transition-all duration-150 delay-50 transform ${
              collapseMenu
                ? "translate-x-2 opacity-0 pointer-events-none cursor-default"
                : ""
            }`}
          >
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

export default SideNavBar;
