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
import { CiSearch, CiTimer } from "react-icons/ci";

/* Custom Components */
import UserInfo from "@/components/UI/UserInfo";
import UsersGrid from "@/components/UI/UsersGrid";

/* Types */
import type { User } from "@/components/UI/UsersGrid";
import { Status } from "@/enums/Status";
import { FaGraduationCap } from "react-icons/fa6";

function TeachersPage() {
  const [Data, setData] = useState([]);
  const [search, setSearch] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [status, setStatus] = useState<Status>(Status.accepted);
  const [areEnrolled, setAreEnrolled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/api/getTeachers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: status }),
      });

      const Data_ = await response.json();
      setData(Data_);
    };
    fetchData();
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [status]);

  const generateUsers = (): User[] => {
    var users: User[] = [];
    users = Data?.map((std: any, i: number) => {
      return {
        id: String(Number(i) + 1).padStart(3, "0"),
        fullName: std.username,
        phone: std.phone_number,
        email: std.email,
        levels: std.level,
        subjects: std.modules_Groups_sessionNumber,
        role: `Teacher`,
      };
    });

    return users;
  };

  const users: User[] = generateUsers();

  return (
    <section className="w-full h-full grid grid-cols-6 grid-rows-6 gap-4 px-2">
      <Card className="col-span-4">
        <CardBody className="px-4 flex flex-col items-center justify-center gap-2">
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
                areEnrolled
                  ? "Show Enrolled Students"
                  : "Show Unenrolled Students"
              }
              color="primary"
              placement="left"
            >
              <div>
                <Switch
                  isSelected={areEnrolled}
                  onValueChange={() => {
                    setAreEnrolled(!areEnrolled);
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
      {!isLoading ? (
        !areEnrolled ? (
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
      {!areEnrolled ? (
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

export default TeachersPage;
