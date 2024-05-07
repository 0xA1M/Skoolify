"use client";
/* Utils */
import { useState } from "react";

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
} from "@nextui-org/react";
import { FiEdit } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";

/* It's going to be a scheduler, with the ability to choose levels and edit the current time plan for each level and save those changes, how to edit same as in google calendar, and each time the admin changes the timetable we should send a notification to all teacher and student in that level informing them about the new time plan. */

/* Types */

type GroupPlan = {
  group: string;
  studyHours: string[];
};

type TimePlan = {
  level: string;
  timePlan: GroupPlan[];
};

function TimeTable() {
  const [level, setLevel] = useState<Selection>(new Set(["1hs"]));
  const [editMode, setEditMode] = useState<boolean>(false);
  const [timePlan, setTimePlan] = useState<TimePlan[]>([]);

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

  return (
    <Card fullWidth className="h-full">
      <CardHeader className="w-full">
        <Select
          radius="sm"
          selectedKeys={level}
          onSelectionChange={setLevel}
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

        <aside>
          {!editMode ? (
            <Button
              color="primary"
              radius="sm"
              variant="shadow"
              endContent={<FiEdit size={16} />}
              onClick={() => setEditMode(true)}
            >
              Edit
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                color="danger"
                radius="sm"
                variant="ghost"
                endContent={<FaXmark size={16} />}
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
              <Button
                color="success"
                variant="solid"
                radius="sm"
                endContent={<FaCheck size={16} />}
                onClick={() => setEditMode(false)}
              >
                Save
              </Button>
            </div>
          )}
        </aside>
      </CardHeader>
      <CardBody></CardBody>
    </Card>
  );
}

export default TimeTable;
