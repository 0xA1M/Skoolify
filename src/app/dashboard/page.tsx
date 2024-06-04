"use client";
/* Utils */
import { ChangeEvent, useEffect, useState } from "react";

/* Components */
import {
  Calendar,
  DateValue,
  Card,
  CardBody,
  Chip,
  CardHeader,
  Divider,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Tabs,
  Tab,
  Tooltip,
  Spinner,
} from "@nextui-org/react";
import { today, getLocalTimeZone, parseDate } from "@internationalized/date";

/* Custom Components */
import StatsCard from "@/components/UI/StatsCard";
import EnrollmentChart from "@/components/UI/EnrollmentChart";

/* Assets */
import { BsPersonGear } from "react-icons/bs";
import { GoMortarBoard } from "react-icons/go";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TfiStatsUp } from "react-icons/tfi";
import { VscSymbolMisc } from "react-icons/vsc";

/* Types */
type Task = {
  date: DateValue;
  tasks: string[];
};

function Dashboard() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentDate, setCurrentDate] = useState<DateValue>(
    today(getLocalTimeZone())
  );
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>("stats");
  const [loading, setLoading] = useState<boolean>(false);

  const addTask = () => {
    if (!task.trim()) return;

    setTasks((prevTasks) => {
      // Create a copy of the tasks array to avoid directly mutating the state
      const updatedTasksList: Task[] = [...prevTasks];

      // Check if the task already exists for the current date
      const target: number = prevTasks.findIndex(
        (taskItem) => taskItem.date === currentDate
      );

      if (target !== -1) {
        // If task already exists for the current date, update the existing task list
        updatedTasksList[target] = {
          ...updatedTasksList[target],
          tasks: [...updatedTasksList[target].tasks, task.trim()],
        };
      } else {
        // If task doesn't exist for the current date, create a new task list and add the task
        updatedTasksList.push({
          date: currentDate,
          tasks: [task.trim()],
        });
      }

      return updatedTasksList; // Return the updated state
    });

    setTask("");
  };

  const removeTask = (i: number) => {
    setTasks((prevTasks) => {
      const updatedTasksArr: Task[] = prevTasks.map((prevTaskItem) =>
        prevTaskItem.date === currentDate
          ? {
              ...prevTaskItem,
              tasks: prevTaskItem.tasks.filter((_, index) => index !== i),
            }
          : prevTaskItem
      );
      return updatedTasksArr.filter((taskItem) => taskItem.tasks.length > 0);
    });
  };

  let Util: React.JSX.Element;

  switch (selectedTab) {
    case "stats":
      Util = <EnrollmentChart />;
      break;

    default:
      Util = <p>Coming Soon!</p>;
      break;
  }

  useEffect(() => {
    setLoading(true);

    let timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    () => clearTimeout(timeout);
  }, [setLoading]);

  return (
    <section className="h-full grid grid-cols-3 grid-rows-8 gap-4">
      <header className="p-2 col-span-3 col-start-1 row-start-1 w-full grid grid-cols-3 grid-rows-1 gap-4">
        <StatsCard
          role="Student"
          val={172}
          Icon={<GoMortarBoard size={36} className="mx-3" />}
        />
        <StatsCard
          role="Teacher"
          val={29}
          Icon={<LiaChalkboardTeacherSolid size={36} className="mx-3" />}
        />
        <StatsCard
          role="Staff"
          val={11}
          Icon={<BsPersonGear size={36} className="mx-3" />}
        />
      </header>

      <main className="p-2 mt-2 col-span-3 row-span-7 row-start-2 grid grid-cols-4 grid-rows-8 gap-4">
        {/* Calendar */}
        <Card className="row-span-8 col-start-4">
          <CardHeader className="pb-0 flex items-center justify-center">
            <Calendar
              showMonthAndYearPickers
              showShadow
              showHelper
              color="primary"
              weekdayStyle="short"
              value={currentDate}
              onChange={setCurrentDate}
            />
          </CardHeader>

          <CardBody className="h-full -mt-3">
            <CardHeader className="px-3 flex flex-col items-start">
              <div className="w-full flex justify-between items-center mb-2 relative">
                {tasks.length > 0 ? (
                  <Tooltip
                    placement="bottom-start"
                    delay={0}
                    radius="none"
                    closeDelay={0}
                    motionProps={{
                      variants: {
                        exit: {
                          opacity: 0,
                          transition: {
                            duration: 0.1,
                            ease: "easeIn",
                          },
                        },
                        enter: {
                          opacity: 1,
                          transition: {
                            duration: 0.15,
                            ease: "easeOut",
                          },
                        },
                      },
                    }}
                    content={tasks.map((task, index) => (
                      <div
                        key={index}
                        className="my-1 flex items-center justify-center gap-3"
                      >
                        <Chip
                          radius="sm"
                          color="primary"
                          onClick={() => setCurrentDate(task.date)}
                          className="cursor-pointer shadow-md transition-background hover:bg-primary-600"
                        >
                          {task.date.toString()}
                        </Chip>
                        <Chip
                          radius="sm"
                          color="primary"
                          onClick={() => setCurrentDate(task.date)}
                          className="cursor-pointer shadow-md transition-background hover:bg-primary-600"
                        >
                          {task.tasks.length}{" "}
                          {task.tasks.length > 1 ? "Tasks" : "Task"}
                        </Chip>
                      </div>
                    ))}
                    classNames={{
                      base: "max-h-52 overflow-y-scroll border-1 rounded-medium",
                    }}
                  >
                    <h3
                      className={`"text-xl ml-4 ${
                        tasks.length > 0 ? "red-dot" : "remove-red-dot"
                      }`}
                    >
                      Tasks
                    </h3>
                  </Tooltip>
                ) : (
                  <Tooltip
                    placement="bottom-start"
                    delay={0}
                    closeDelay={0}
                    motionProps={{
                      variants: {
                        exit: {
                          opacity: 0,
                          transition: {
                            duration: 0.1,
                            ease: "easeIn",
                          },
                        },
                        enter: {
                          opacity: 1,
                          transition: {
                            duration: 0.15,
                            ease: "easeOut",
                          },
                        },
                      },
                    }}
                    content="You don't have any tasks planned"
                    classNames={{
                      content: "bg-primary text-white rounded-md px-3",
                    }}
                  >
                    <h3
                      className={`"text-xl ml-4 ${
                        tasks.length > 0 ? "red-dot" : "remove-red-dot"
                      }`}
                    >
                      Tasks
                    </h3>
                  </Tooltip>
                )}

                <Button
                  isIconOnly
                  size="sm"
                  radius="sm"
                  color="primary"
                  variant="light"
                  onClick={onOpen}
                  className="mr-4"
                >
                  <IoAddCircleOutline size={22} />
                </Button>
              </div>

              <Divider />
            </CardHeader>

            <CardBody className="overflow-y-auto flex flex-col items-center gap-4 p-2">
              {tasks
                .filter((taskItem) => {
                  const taskDate = parseDate(taskItem.date.toString()).toDate(
                    getLocalTimeZone()
                  );
                  const currentDateVal = parseDate(
                    currentDate.toString()
                  ).toDate(getLocalTimeZone());

                  return taskDate.getTime() === currentDateVal.getTime();
                })
                .flatMap((task) =>
                  task.tasks.map((taskText, i) => (
                    <Card
                      shadow="sm"
                      radius="sm"
                      className="w-full min-h-12"
                      key={`${taskText}-${i}`}
                    >
                      <CardBody className="max-w-full overflow-hidden flex flex-row items-center justify-between">
                        <p className="mr-2">{taskText}</p>

                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          color="danger"
                          onClick={() => removeTask(i)}
                          className="z-50"
                        >
                          <MdOutlineDeleteOutline size={20} />
                        </Button>
                      </CardBody>
                    </Card>
                  ))
                )}
            </CardBody>
          </CardBody>
        </Card>

        {/* Multi Functionalities */}
        <Card className="col-span-3 row-start-1 row-span-8">
          <CardHeader className="w-full p-4">
            <Tabs
              color="primary"
              aria-label="Options"
              selectedKey={selectedTab}
              onSelectionChange={(key) => setSelectedTab(key.toString())}
            >
              <Tab
                key="stats"
                title={
                  <div className="flex items-center space-x-2">
                    <TfiStatsUp size={18} />
                    <p>Stats</p>
                  </div>
                }
              ></Tab>
              <Tab
                isDisabled
                key="other"
                title={
                  <div className="flex items-center space-x-2">
                    <VscSymbolMisc size={18} />
                    <p>Other</p>
                  </div>
                }
              ></Tab>
            </Tabs>
          </CardHeader>
          <CardBody className="w-full h-full flex items-center justify-center">
            {loading ? <Spinner /> : Util!}
          </CardBody>
        </Card>
      </main>

      {/* Task Input Prompt */}
      <Modal
        hideCloseButton
        isKeyboardDismissDisabled
        isDismissable={false}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Enter Your Task</ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  autoFocus
                  label="Task"
                  placeholder="Enter your task"
                  variant="bordered"
                  value={task.trim()}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTask(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      onClose();
                      addTask();
                    }
                  }}
                  maxLength={16}
                />

                <p
                  className={`text-sm pl-1 absolute bottom-[3.3rem] transition-opacity duration-100 ease-linear ${
                    task.length >= 16 ? "opacity-1" : "opacity-0"
                  }`}
                >
                  You&apos;ve reached the max number of characters
                </p>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose();
                    setTask("");
                  }}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onClose();
                    addTask();
                  }}
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}

export default Dashboard;
