"use client";
/* Utils */
import { useState, ChangeEvent } from "react";

/* Components */
import { Button, Card, CardBody, Input, Switch } from "@nextui-org/react";
import Link from "next/link";
import { CiSearch, CiTimer } from "react-icons/ci";
import { FaGraduationCap } from "react-icons/fa6";

/* Custom Components */
import UserInfo from "@/components/UI/UserInfo";
import UsersGrid from "@/components/UI/UsersGrid";

/* Types */
import type { User } from "@/components/UI/UsersGrid";

function StudentPage() {
  const [search, setSearch] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [areEnrolled, setAreEnrolled] = useState<boolean>(false);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  /* This function is only for testing */
  const generateUsers = (count: number): User[] => {
    const users: User[] = [];
    for (let i = 1; i <= count; i++) {
      const user: User = {
        id: String(i).padStart(3, "0"),
        fullName: `User Name ${i}`,
        phone: `+213 0512345678`,
        email: `user${i}@example.com`,
        levels: [`${i} HS`],
        subjects: [
          {
            subject: "Math",
            group: `Grp ${i}`,
            sessions: i - 1,
          },
          {
            subject: "Physics",
            group: `Grp ${i}`,
            sessions: i,
          },
          {
            subject: "Science",
            group: `Grp ${i}`,
            sessions: i,
          },
          {
            subject: "English",
            group: `Grp ${i}`,
            sessions: i,
          },
          {
            subject: "Arabic",
            group: `Grp ${i}`,
            sessions: i,
          },
        ],
        role: `Student`,
      };
      users.push(user);
    }
    return users;
  };

  const placeholderUsers: User[] = generateUsers(25);

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

            <Switch
              isSelected={areEnrolled}
              onValueChange={() => {
                setAreEnrolled(!areEnrolled);
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

          <Input
            type="text"
            placeholder="Search for a teacher"
            value={search}
            onChange={handleSearch}
            isClearable
            onClear={() => setSearch("")}
            startContent={<CiSearch size={22} />}
          />
        </CardBody>
      </Card>

      {!areEnrolled ? (
        <UsersGrid
          users={placeholderUsers}
          role="student"
          search={search}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          enrolled
        />
      ) : (
        <UsersGrid
          users={placeholderUsers}
          role="student"
          search={search}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      )}

      <UserInfo user={placeholderUsers[selectedUser - 1]} />
    </section>
  );
}

export default StudentPage;
