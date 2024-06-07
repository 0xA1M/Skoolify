"use client";
/* Utils */
import { useState, ChangeEvent } from "react";

/* Components */
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";

/* Custom Components */
import UserInfo from "@/components/UI/UserInfo";
import UsersGrid from "@/components/UI/UsersGrid";

/* Types */
import type { User } from "@/components/UI/UsersGrid";

function StaffPage() {
  const [search, setSearch] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [Data, setData] = useState([]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const generateUsers = (): User[] => {
    var users: User[] = [];
    users = Data?.map((std: any, i: Number) => {
      return {
        id: String(i).padStart(3, "0"),
        fullName: std.username,
        phone: std.phone_number,
        email: std.email,
        levels: [std.level],
        subjects: std.modules_Groups_sessionNumber,
        role: `Staff`,
      };
    });

    return users;
  };

  const users: User[] = [
    {
      id: "001",
      fullName: "asdasd",
      phone: "123123",
      email: "asd@asd.coim",
      role: "Staff",
      levels: [""],
      subjects: [],
    },
    {
      id: "002",
      fullName: "asdasd",
      phone: "123123",
      email: "asd@asd.coim",
      role: "Staff",
      levels: [""],
      subjects: [],
    },
  ];

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
                href="/dashboard/staff/add"
                variant="solid"
                radius="sm"
                color="primary"
              >
                Add Staff
              </Button>
            </div>
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
        users={users}
        role="staff"
        search={search}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        enrolled
      />

      <UserInfo
        user={
          users[users.findIndex((obj) => parseInt(obj.id) === selectedUser)]
        }
        enrolled
      />
    </section>
  );
}

export default StaffPage;
