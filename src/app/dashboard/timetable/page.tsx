"use client";
/* Utils */
import { ChangeEvent, useEffect, useState } from "react";
import {
  DateValue,
  Time,
  getLocalTimeZone,
  now,
} from "@internationalized/date";

/* Components */
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
  SelectSection,
  Selection,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Input,
  DatePicker,
  Divider,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import { FiPlusCircle } from "react-icons/fi";
import { CiCalendar } from "react-icons/ci";
import { CiTimer } from "react-icons/ci";
import { TbMathFunction } from "react-icons/tb";
import { SiGoogleclassroom } from "react-icons/si";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaRepeat } from "react-icons/fa6";
import { CiCircleRemove } from "react-icons/ci";

/* Custom Components */
import Scheduler from "@/components/UI/Scheduler";

/* Types */
export type Event = {
  id: string | number;
  start: string;
  end: string;
  calendarId: string;
  title?: string;
  description?: string;
  location?: string;
  people?: string[];
  rrule?: string;
};

function TimeTable() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [error, setError] = useState<boolean>(false);
  const [removeAll, setRemoveAll] = useState<boolean>(false);
  const [eventsCount, setEventsCount] = useState<number>(0);
  const [event, setEvent] = useState<Event>({
    id: 0,
    start: "",
    end: "",
    calendarId: "school",
  });
  const [startDate, setStartDate] = useState<DateValue>(
    now(getLocalTimeZone()).set({ hour: 8, minute: 0 })
  );
  const [endDate, setEndDate] = useState<DateValue>(
    now(getLocalTimeZone()).set({ hour: 9, minute: 0 })
  );
  const [taskData, setTaskData] = useState<Event>({
    id: "",
    start: "",
    end: "",
    calendarId: "school",
  });
  const [level, setLevel] = useState<Selection>(new Set(["1hs"]));

  const minTime = new Time(8);
  const maxTime = new Time(16);
  const educationLvl = [
    {
      education: "HS",
      levels: [
        {
          label: "1 HS",
          value: "1hs",
        },
        {
          label: "2 HS",
          value: "2hs",
        },
        {
          label: "3 HS",
          value: "3hs",
        },
      ],
    },
    {
      education: "MS",
      levels: [
        {
          label: "1 MS",
          value: "1ms",
        },
        {
          label: "2 MS",
          value: "2ms",
        },
        {
          label: "3 MS",
          value: "3ms",
        },
      ],
    },
  ];

  const formatDate = (date: string): string => {
    return `${date.substring(0, 10)} ${date.substring(11, 16)}`;
  };

  const handleInput = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    let people: string[] = [];

    if (name === "people") {
      value.split(",").map((value) => people.push(value));
    }

    const data = name === "people" ? { [name]: people } : { [name]: value };

    setTaskData((prevTask) => ({
      ...prevTask,
      ...data,
      start: formatDate(startDate.toString()),
      end: formatDate(endDate.toString()),
    }));
  };

  const addTask = () => {
    const newTask = {
      ...taskData,
      id: eventsCount,
    };
    setEvent(newTask);

    setTaskData({
      id: "",
      start: "",
      end: "",
      calendarId: "school",
    });
  };

  useEffect(() => {
    setError(
      startDate.toDate(getLocalTimeZone()).getHours() < 8 ||
        startDate.toDate(getLocalTimeZone()).getHours() > 16 ||
        startDate.compare(endDate) > 0 ||
        endDate.toDate(getLocalTimeZone()).getHours() < 8 ||
        endDate.toDate(getLocalTimeZone()).getHours() > 16 ||
        endDate.compare(startDate) < 0 ||
        endDate.compare(startDate) == 0
    );
  }, [endDate, startDate]);

  return (
    <Card fullWidth className="h-full">
      <CardHeader className="w-full">
        <Select
          radius="sm"
          selectedKeys={level}
          onSelectionChange={setLevel}
          aria-label="Select education level"
          className="max-w-28 mr-auto"
        >
          {educationLvl.map((edu, index) => (
            <SelectSection key={index} title={edu.education}>
              {edu.levels.map((level, _) => (
                <SelectItem key={`${level.value}`}>{level.label}</SelectItem>
              ))}
            </SelectSection>
          ))}
        </Select>

        <aside className="flex items-center gap-2">
          <Button
            color="danger"
            radius="sm"
            variant="ghost"
            onClick={() => {
              setRemoveAll(true);
              setEventsCount(0);
            }}
            endContent={<CiCircleRemove size={16} />}
            aria-label="Remove all study sessions"
          >
            Clear
          </Button>

          <Button
            color="primary"
            radius="sm"
            variant="shadow"
            endContent={<FiPlusCircle size={16} />}
            onPress={onOpen}
            aria-label="Add new study session"
          >
            Add
          </Button>
        </aside>
      </CardHeader>
      <CardBody>
        <Scheduler
          event={event}
          removeAll={removeAll}
          setRemoveAll={setRemoveAll}
        />

        {/* Add Task */}
        <Modal
          hideCloseButton
          backdrop="blur"
          size="2xl"
          isDismissable={false}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          aria-labelledby="schedule-study-sessions-modal"
        >
          <ModalContent className="p-2">
            {(onClose) => (
              <>
                <ModalHeader className="flex item-center gap-2 m-2">
                  <CiCalendar size={26} />
                  <p id="schedule-study-sessions-modal">
                    Schedule Studying Sessions
                  </p>
                </ModalHeader>

                <Divider />

                <ModalBody className="my-4 grid grid-cols-2 gap-6">
                  <DatePicker
                    autoFocus
                    hideTimeZone
                    isRequired
                    value={startDate}
                    isInvalid={
                      startDate &&
                      (startDate.toDate(getLocalTimeZone()).getHours() < 8 ||
                        startDate.toDate(getLocalTimeZone()).getHours() > 16 ||
                        startDate.compare(endDate) > 0 ||
                        startDate.compare(endDate) == 0)
                    }
                    granularity="minute"
                    radius="sm"
                    name="start"
                    label="Start Date & Time"
                    hourCycle={24}
                    timeInputProps={{
                      startContent: <CiTimer size={24} />,
                      minValue: minTime,
                      maxValue: maxTime,
                    }}
                    calendarProps={{
                      weekdayStyle: "short",
                    }}
                    onChange={setStartDate}
                    aria-label="Select start date and time for the study session"
                  />

                  <DatePicker
                    hideTimeZone
                    isRequired
                    value={endDate}
                    isInvalid={
                      endDate &&
                      (endDate.toDate(getLocalTimeZone()).getHours() < 8 ||
                        endDate.toDate(getLocalTimeZone()).getHours() > 16 ||
                        endDate.compare(startDate) < 0 ||
                        endDate.compare(startDate) == 0)
                    }
                    granularity="minute"
                    name="end"
                    radius="sm"
                    label="End Date & Time"
                    hourCycle={24}
                    timeInputProps={{
                      startContent: <CiTimer size={24} />,
                      minValue: minTime,
                      maxValue: maxTime,
                    }}
                    calendarProps={{
                      weekdayStyle: "short",
                    }}
                    onChange={setEndDate}
                    aria-label="Select end date and time for the study session"
                  />

                  <Input
                    isRequired
                    type="text"
                    radius="sm"
                    name="title"
                    label="Title"
                    placeholder="Math"
                    onChange={handleInput}
                    endContent={
                      <TbMathFunction
                        className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        size={20}
                      />
                    }
                    aria-label="Enter a descriptive title for the study session"
                  />

                  <Input
                    isRequired
                    type="text"
                    radius="sm"
                    name="location"
                    onChange={handleInput}
                    label="Class"
                    placeholder="A-01"
                    endContent={
                      <SiGoogleclassroom
                        className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        size={20}
                      />
                    }
                    aria-label="Enter the class or location for the study session"
                  />

                  <Input
                    isRequired
                    type="text"
                    radius="sm"
                    name="people"
                    onChange={handleInput}
                    label="Teacher & Group"
                    placeholder="Dr. Leonard, Grp-12, ..."
                    endContent={
                      <HiMiniUserGroup
                        className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                        size={20}
                      />
                    }
                    aria-label="Specify the teacher and group involved in the study session"
                  />

                  <Select
                    isDisabled
                    radius="sm"
                    label="Occurrences"
                    name="rrule"
                    selectorIcon={<FaRepeat size={20} />}
                    classNames={{
                      selectorIcon:
                        "text-2xl text-default-400 pointer-events-none flex-shrink-0",
                    }}
                    aria-label="Specify recurring schedule for the study session (optional)"
                  >
                    <SelectItem key="DAILY">Daily</SelectItem>
                    <SelectItem key="WEEKLY">Weekly</SelectItem>
                    <SelectItem key="MONTHLY">Monthly</SelectItem>
                    <SelectItem key="YEARLY">Yearly</SelectItem>
                  </Select>

                  <Textarea
                    type="text"
                    name="description"
                    radius="sm"
                    onChange={handleInput}
                    label="Description"
                    placeholder="Anything you want to add"
                    className="col-span-2"
                    aria-label="Provide a detailed description for the study session (optional)"
                  />
                </ModalBody>

                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    isDisabled={error}
                    color="primary"
                    onPress={() => {
                      onClose();
                      addTask();
                      setEventsCount((prevCount) => prevCount + 1);
                    }}
                    aria-label="Save the newly created study session"
                  >
                    Add
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </CardBody>
    </Card>
  );
}
export default TimeTable;
