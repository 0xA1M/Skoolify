"use client";
/* Utils */
import { ChangeEvent, FormEvent, useState } from "react";

/* Components */
import {
  Button,
  Select,
  SelectSection,
  SelectItem,
  Input,
} from "@nextui-org/react";

/* Types */
import { FormProps } from "../Form";

/* Second Form: This will retrieve the level, subjects for the teacher as for the student in addition to the previous ones a group will be asked */
function SecondForm({ formData, setStep, setFormData }: FormProps) {
  const [levels, setLevels] = useState<string[]>([]);
  const [teacherSubjects, setTeacherSubjects] = useState<
    {
      level: string;
      subjects: string[];
    }[]
  >([]);
  const [studentSubjects, setStudentSubjects] = useState<string[]>([]);
  const [groups, setGroups] = useState<string[]>([]);
  const [sessions, setSessions] = useState<string[]>([]);

  const handleSelectLevels = (event: ChangeEvent<HTMLSelectElement>) => {
    setLevels(event.target.value.split(","));
  };

  const handleTeacherSelectLevelSubjects = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const level = event.target.name;
    const data = {
      level,
      subjects: event.target.value.split(","),
    };

    setTeacherSubjects((prevSubjects) => {
      const index = prevSubjects.findIndex(
        (subject) => subject.level === data.level
      );

      if (index !== -1) {
        // If the level already exists in the array, update the subjects array
        return prevSubjects.map((subject, i) => {
          if (i === index) {
            return { ...subject, subjects: data.subjects };
          }
          return subject;
        });
      } else {
        // If the level does not exist in the array, append the new object
        return [...prevSubjects, data];
      }
    });
  };

  const handleSelectLevelSubjects = (event: ChangeEvent<HTMLSelectElement>) => {
    setStudentSubjects(event.target.value.split(","));
  };

  const handleGroupSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const subject = event.target.name;
    const group = parseInt(event.target.value);

    const data = `${subject}:${group}`;

    setGroups((prevGroup) => {
      const isExisting = prevGroup.some((item) => item.startsWith(subject));
      if (!isExisting) {
        return [...prevGroup, data];
      } else {
        return prevGroup;
      }
    });
  };

  const handleSessionsInput = (event: ChangeEvent<HTMLInputElement>) => {
    const subject = event.target.name;
    const sessions = parseInt(event.target.value);

    const data = `${subject}:${sessions}`;

    setSessions((prevSessions) => {
      const isExisting = prevSessions.some((item) => item.startsWith(subject));
      if (!isExisting) {
        return [...prevSessions, data];
      } else {
        return prevSessions;
      }
    });
  };

  /* Append the data to the FormData stateful variable */
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData?.role === "student") {
      /* Student's Data */
      const subjects: {
        subject: string;
        group: number;
        sessions: number;
      }[] = [];

      for (let i = 0; i < studentSubjects.length; i++) {
        subjects.push({
          subject: studentSubjects[i],
          group: parseInt(groups[i].split(":")[1]),
          sessions: parseInt(sessions[i].split(":")[1]),
        });
      }

      const data = {
        levels,
        subjects,
      };

      setFormData((prevData) => {
        return {
          ...prevData,
          ...data,
        };
      });
    } else if (formData?.role === "teacher") {
      /* Teacher's Data */
      const data = {
        levels,
        subjects: teacherSubjects,
      };

      setFormData((prevData) => {
        return {
          ...prevData,
          ...data,
        };
      });
    } else {
      /* Need to Handle this case */
      return Error("500: Internal Server Error!");
    }

    setStep((prevStepCount) => prevStepCount + 1);
  };

  const educationLvl = [
    {
      education: "HS",
      levels: [
        {
          label: "1HS",
          value: "1hs",
        },
        {
          label: "2HS",
          value: "2hs",
        },
        {
          label: "3HS",
          value: "3hs",
        },
      ],
    },
    {
      education: "MS",
      levels: [
        {
          label: "1MS",
          value: "1ms",
        },
        {
          label: "2MS",
          value: "2ms",
        },
        {
          label: "3MS",
          value: "3ms",
        },
      ],
    },
  ];

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

  return (
    <>
      <form
        onSubmit={onSubmit}
        className={`w-full ${
          formData?.role == "teacher" ? "h-full lg:h-5/6" : "h-unit-7xl"
        } flex flex-col items-center ${
          formData?.role == "teacher" ? "" : "justify-center"
        } lg:gap-4`}
      >
        {formData?.role == "teacher" && (
          <div className="w-full flex items-center justify-center flex-col">
            <h1 className="text-2xl lg:text-3xl text-center">
              👋 Hello Dear Teacher!
            </h1>

            <div className="w-unit-6xl lg:px-6 flex items-center justify-center m-6">
              <Select
                label="Choose the levels you want to teach"
                labelPlacement="outside"
                placeholder="Level"
                isRequired
                selectionMode="multiple"
                name="level"
                onChange={handleSelectLevels}
                className="w-full text-center"
              >
                {educationLvl.map((level, _) => (
                  <SelectSection key={level.education} title={level.education}>
                    {level.levels.map((level, _) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectSection>
                ))}
              </Select>
            </div>

            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-1 p-8 gap-8 gap-y-8 lg:gap-y-14">
              {levels[0] != "" &&
                levels.map((level, _) => (
                  <Select
                    label={`Choose the subject your want to teach ${level.toUpperCase()}`}
                    labelPlacement="outside"
                    placeholder="Math"
                    isRequired
                    selectionMode="multiple"
                    name={level}
                    onChange={handleTeacherSelectLevelSubjects}
                    key={level}
                    className="text-center"
                  >
                    {subjects.map((subject, _) => (
                      <SelectItem key={subject.value} value={subject.value}>
                        {subject.label}
                      </SelectItem>
                    ))}
                  </Select>
                ))}
            </div>
          </div>
        )}

        {formData?.role == "student" && (
          <div className="w-full h-full flex flex-col items-center justify-center mt-20">
            <h1 className="text-4xl lg:text-5xl text-center lg:my-0">
              👋 Hello Dear Student!
            </h1>

            <div className="w-9/12 h-full flex flex-col lg:flex-row items-center justify-between p-8 gap-8">
              {/* Level Selection Menu */}
              <Select
                label="Educational Level"
                labelPlacement="outside"
                placeholder="Level"
                isRequired
                name="level"
                onChange={handleSelectLevels}
              >
                {educationLvl.map((level, _) => (
                  <SelectSection key={level.education} title={level.education}>
                    {level.levels.map((level, _) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectSection>
                ))}
              </Select>

              {/* Subjects Selection Menu */}
              {levels.map((level, _) => (
                <Select
                  label={`Subjects`}
                  labelPlacement="outside"
                  placeholder="Math"
                  isRequired
                  selectionMode="multiple"
                  name={level}
                  onChange={handleSelectLevelSubjects}
                  key={level}
                >
                  {subjects.map((subject, _) => (
                    <SelectItem key={subject.value} value={subject.value}>
                      {subject.label}
                    </SelectItem>
                  ))}
                </Select>
              ))}
            </div>

            <div className="w-9/12 h-full grid grid-cols-2 grid-rows-1 gap-8 place-items-center">
              {/* Group Selection Menu */}
              {studentSubjects.map((subject, i) => (
                <div key={i} className="w-full flex item-center gap-4">
                  <Select
                    label={`${
                      subject.charAt(0).toUpperCase() + subject.slice(1)
                    } group`}
                    labelPlacement="outside"
                    placeholder="Group 1"
                    isRequired
                    name={subject}
                    onChange={handleGroupSelect}
                    key={subject}
                  >
                    {subjects.map((_, groupNum) => (
                      <SelectItem key={groupNum + 1} value={groupNum + 1}>
                        {`Group ${groupNum + 1}`}
                      </SelectItem>
                    ))}
                  </Select>

                  <Input
                    label="Sessions"
                    labelPlacement="outside"
                    placeholder="4"
                    key={i}
                    name={subject}
                    type="number"
                    min={1}
                    max={52}
                    value={sessions[i] ? sessions[i].split(":")[1] : ""}
                    onChange={handleSessionsInput}
                    isRequired
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          type="submit"
          variant="shadow"
          color="primary"
          className="-mb-20 mt-10 py-6 px-8"
          size="lg"
        >
          Next
        </Button>
      </form>
    </>
  );
}

export default SecondForm;
