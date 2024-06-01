"use client";
/* Utils */
import { useState } from "react";
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  today,
} from "@internationalized/date";

/* Components */
import {
  Avatar,
  Button,
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
  Tabs,
  Tab,
  Tooltip,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { TbSunMoon } from "react-icons/tb";
import { MdOutlineContactSupport } from "react-icons/md";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { FaChartLine } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { TbMathFunction } from "react-icons/tb";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { LuCalendarClock } from "react-icons/lu";

/* Custom Components */
import Logo from "@/components/UI/Logo";
import ThemeSwitcher from "@/components/UI/ThemeSwitcher";
import DayCell from "@/components/UI/DayCell";
import Schedule from "@/components/UI/Schedule";

function StudentDashboard() {
  const [selectedSubject, setSelectedSubject] = useState<string>("math"); // change this according to the student's data
  const [selectedDate, setSelectedDate] = useState<CalendarDate>(
    today(getLocalTimeZone())
  );
  const [selectedDay, setSelectedDay] = useState<number>(
    today(getLocalTimeZone()).day
  );
  const [notification, setNotification] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<string>("schedule");

  let UtilNode: React.JSX.Element;

  const subjects = [
    {
      value: "math",
      label: "Math",
    },
    {
      value: "physics",
      label: "Physics",
    },

    {
      value: "science",
      label: "Science",
    },

    {
      value: "english",
      label: "English",
    },

    {
      value: "arabic",
      label: "Arabic",
    },
  ];

  switch (selectedTab) {
    case "schedule":
      UtilNode = (
        <>
          <Schedule
            event={{
              id: 1,
              title: "Coffee with John",
              start: "2024-05-31 10:00",
              end: "2024-05-31 10:30",
              calendarId: "school",
            }}
          />
        </>
      );
      break;

    case "subjects":
      UtilNode = (
        <div className="h-full grid grid-cols-10 grid-rows-1 gap-2">
          <Card className="col-span-7">
            <CardBody>Classmates</CardBody>
          </Card>

          <Card className="col-span-3 col-start-8">
            <CardBody>General Info</CardBody>
          </Card>
        </div>
      );
      break;

    case "progress":
      UtilNode = (
        <>
          <p>Progress</p>
        </>
      );
      break;

    case "resources":
      UtilNode = (
        <>
          <p>Resources</p>
        </>
      );
      break;
  }

  const handleNextWeek = () => {
    setSelectedDate((prevDate) => prevDate.add({ weeks: 1 }));
  };

  const handlePrevWeek = () => {
    setSelectedDate((prevDate) => prevDate.subtract({ weeks: 1 }));
  };

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(e.target.value);
  };

  return (
    <Card fullWidth shadow="lg">
      <CardHeader className="flex items-center justify-between h-16">
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
                  href={"/student/notifications"}
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
                  href={"/student/settings"}
                  startContent={
                    <IoSettingsOutline className="text-xl text-default-500 pointer-events-none flex-shrink-0" />
                  }
                >
                  Settings
                </DropdownItem>

                <DropdownItem
                  key="support"
                  startContent={
                    <MdOutlineContactSupport className="text-xl text-default-500 pointer-events-none flex-shrink-0" />
                  }
                >
                  Support
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

      <CardBody className="grid grid-cols-9 grid-rows-7 gap-3">
        {/* Assignments */}
        <Card className="col-span-2 row-span-7" shadow="lg">
          <CardHeader className="flex flex-col items-center justify-between">
            <h2 className="p-2 px-4 w-full flex items-center justify-between text-xl mb-2">
              Assignment{" "}
              <LuCalendarClock
                size={24}
                onClick={() => setSelectedDay(today(getLocalTimeZone()).day)}
                className="cursor-pointer"
              />
            </h2>

            {/* Weekly calendar */}
            <Card fullWidth className="h-32">
              <CardHeader className="-mb-12">
                <Button
                  isIconOnly
                  size="sm"
                  radius="full"
                  color="primary"
                  variant="ghost"
                  onClick={handlePrevWeek}
                  aria-label="Previous week"
                >
                  <FaChevronLeft />
                </Button>

                <span className="w-full text-center text-lg">
                  {new DateFormatter(getLocalTimeZone(), {
                    month: "long",
                    year: "numeric",
                  }).format(selectedDate.toDate(getLocalTimeZone()))}
                </span>

                <Button
                  isIconOnly
                  size="sm"
                  radius="full"
                  color="primary"
                  variant="ghost"
                  onClick={handleNextWeek}
                  aria-label="Next week"
                >
                  <FaChevronRight />
                </Button>
              </CardHeader>

              <CardBody className="flex flex-row items-center justify-center gap-1">
                <DayCell
                  selectedDate={selectedDate}
                  day={selectedDay}
                  setDay={setSelectedDay}
                />
                <DayCell
                  selectedDate={selectedDate.add({ days: 1 })}
                  day={selectedDay}
                  setDay={setSelectedDay}
                />
                <DayCell
                  selectedDate={selectedDate.add({ days: 2 })}
                  day={selectedDay}
                  setDay={setSelectedDay}
                />
                <DayCell
                  selectedDate={selectedDate.add({ days: 3 })}
                  day={selectedDay}
                  setDay={setSelectedDay}
                />
                <DayCell
                  selectedDate={selectedDate.add({ days: 4 })}
                  day={selectedDay}
                  setDay={setSelectedDay}
                />
                <DayCell
                  selectedDate={selectedDate.add({ days: 5 })}
                  day={selectedDay}
                  setDay={setSelectedDay}
                />
                <DayCell
                  selectedDate={selectedDate.add({ days: 6 })}
                  day={selectedDay}
                  setDay={setSelectedDay}
                />
              </CardBody>
            </Card>
          </CardHeader>

          <CardBody className="flex flex-col items-center gap-2">
            <Card fullWidth shadow="sm" className="min-h-20">
              <CardBody>Working on it!</CardBody>
            </Card>
          </CardBody>
        </Card>

        {/* Utils */}
        <Card className="col-span-7 row-span-7 col-start-3">
          <CardHeader className="w-full p-4 flex items-center justify-between">
            <Tabs
              color="primary"
              aria-label="Utilities"
              selectedKey={selectedTab}
              onSelectionChange={(key) => setSelectedTab(key.toString())}
              className="mr-auto"
            >
              <Tab
                key="schedule"
                title={
                  <div className="flex items-center space-x-2">
                    <RiCalendarScheduleFill size={18} />
                    <p>Schedule</p>
                  </div>
                }
              ></Tab>
              <Tab
                key="subjects"
                title={
                  <div className="flex items-center space-x-2">
                    <TbMathFunction size={18} />
                    <p>Subjects</p>
                  </div>
                }
              ></Tab>
              <Tab
                key="progress"
                title={
                  <div className="flex items-center space-x-2">
                    <FaChartLine size={18} />
                    <p>Progress</p>
                  </div>
                }
              ></Tab>
              <Tab
                key="resources"
                title={
                  <div className="flex items-center space-x-2">
                    <IoLibrary size={18} />
                    <p>Resources</p>
                  </div>
                }
              ></Tab>
            </Tabs>

            {selectedTab === "subjects" && (
              <Select
                radius="sm"
                selectionMode="single"
                label="Groups"
                labelPlacement="outside-left"
                selectedKeys={[selectedSubject]}
                onChange={handleSelectionChange}
                items={subjects}
                className="flex items-center w-40"
              >
                {(subject) => (
                  <SelectItem key={subject.value}>{subject.label}</SelectItem>
                )}
              </Select>
            )}
          </CardHeader>

          <CardBody className="overflow-hidden">{UtilNode!}</CardBody>
        </Card>
      </CardBody>
    </Card>
  );
}

export default StudentDashboard;
