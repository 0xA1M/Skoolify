"use client";
/* Utils */
import { useState, ChangeEvent } from "react";

/* Components */
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";

/* Custom Components */
import UserInfo from "@/components/UI/UserInfo";
import UsersGrid from "@/components/UI/UsersGrid";

/* Types */
import type { User } from "@/components/UI/UsersGrid";

function StudentPage() {
  const [search, setSearch] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<number>(0);

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
        groups: [`Grp ${i}`, `Grp ${i}`, `Grp ${i}`, `Grp ${i}`, `Grp ${i}`],
        subjects: [`Math`, `Physics`, `Science`, `English`, `Arabic`],
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
          <div className="w-full flex gap-3">
            <Button variant="ghost" radius="sm" color="primary">
              Export CSV
            </Button>
            <Button
              variant="solid"
              radius="sm"
              color="primary"
              className="shadow-md shadow-primary-300"
            >
              Add Student
            </Button>
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

      <UsersGrid
        users={placeholderUsers}
        role="student"
        search={search}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />

      <UserInfo user={placeholderUsers[selectedUser - 1]} />
    </section>
  );
}

export default StudentPage;
