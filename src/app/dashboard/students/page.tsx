"use client";
/* Utils */
import { useState, ChangeEvent, useEffect } from "react";

/* Components */
import {
  Button,
  Card,
  CardBody,
  Input,
  Spinner,
  Switch,
  Tooltip,
} from "@nextui-org/react";
import Link from "next/link";

/* Custom Components */
import UserInfo from "@/components/UI/UserInfo";
import UsersGrid from "@/components/UI/UsersGrid";

/* Assets */
import { CiSearch, CiTimer } from "react-icons/ci";
import { FaGraduationCap } from "react-icons/fa6";

/* Types */
import type { User } from "@/components/UI/UsersGrid";
import { Status } from "@/enums/Status";

function StudentPage() {
  const [search, setSearch] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [data, setData] = useState<User[]>([]);
  const [status, setStatus] = useState<Status>(Status.accepted);
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/api/getStudents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: status }),
      });

      const data = await response.json();
      setData(data);
    };

    fetchData();

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [status]);

  const generateUsers = (): User[] => {
    let users: User[] = [];

    users = data?.map((std: any, i: Number) => {
      return {
        id: String(Number(i) + 1).padStart(3, "0"),
        fullName: std.username,
        phone: std.phone_number,
        email: std.email,
        levels: [std.level],
        subjects: std.modules_Groups_sessionNumber,
        role: `Student`,
      };
    });

    return users;
  };

  const users: User[] = generateUsers();

  return (
    <section className="w-full h-full grid grid-cols-6 grid-rows-6 gap-4 px-2">
      {/* Header */}
      <Card className="col-span-4">
        <CardBody className="px-4 flex flex-col items-center justify-center gap-2  overflow-hidden">
          <div className="w-full flex items-center justify-between">
            <div className="w-full flex gap-3">
              <Button variant="ghost" radius="sm" color="primary">
                Export CSV
              </Button>
              <Button
                as={Link}
                href="/dashboard/students/add"
                variant="solid"
                radius="sm"
                color="primary"
                className="shadow-md shadow-primary-300"
              >
                Add Student
              </Button>
            </div>

            <Tooltip
              showArrow
              content={
                isEnrolled
                  ? "Show Enrolled Students"
                  : "Show Unenrolled Students"
              }
              color="primary"
              placement="left"
            >
              <div>
                <Switch
                  isSelected={isEnrolled}
                  onValueChange={() => {
                    setIsEnrolled(!isEnrolled);
                    status === Status.accepted
                      ? setStatus(Status.request)
                      : setStatus(Status.accepted);
                    setSelectedUser(0);
                  }}
                  thumbIcon={({ isSelected, className }) =>
                    !isSelected ? (
                      <FaGraduationCap className={className} />
                    ) : (
                      <CiTimer className={className} />
                    )
                  }
                />
              </div>
            </Tooltip>
          </div>

          <Input
            type="text"
            placeholder="Search for a student"
            value={search}
            onChange={handleSearch}
            isClearable
            onClear={() => setSearch("")}
            startContent={<CiSearch size={22} />}
          />
        </CardBody>
      </Card>

      {/* Teachers Table */}
      {!isLoading ? (
        !isEnrolled ? (
          <UsersGrid
            users={users}
            role="student"
            search={search}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            enrolled
          />
        ) : (
          <UsersGrid
            users={users}
            role="student"
            search={search}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        )
      ) : (
        <div className=" w-[800px] h-[500px] flex justify-center items-center">
          <Spinner size="lg" color="primary" />
        </div>
      )}

      {/* Teacher's Info Card */}
      {!isEnrolled ? (
        <UserInfo
          user={
            users[users.findIndex((obj) => parseInt(obj.id) === selectedUser)]
          }
          enrolled
        />
      ) : (
        <UserInfo
          user={
            users[users.findIndex((obj) => parseInt(obj.id) === selectedUser)]
          }
          enrolled={false}
        />
      )}
    </section>
  );
}

export default StudentPage;
