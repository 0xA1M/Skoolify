"use client";
/* Utils */
import { useState, ChangeEvent, useEffect } from "react";

/* Components */
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";

/* Custom Components */
import UserInfo from "@/components/UI/UserInfo";
import UsersGrid from "@/components/UI/UsersGrid";

/* Types */
import type { User } from "@/components/UI/UsersGrid";

function TeachersPage() {
  const [Data, setData] = useState([]);
  const [search, setSearch] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<number>(0);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

 
  useEffect(() => {
    const FechData = async () => {
      const response = await fetch(`http://localhost:3000/api/getTeachers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
    //    body: JSON.stringify({ status: status }),
      });

      const Data_ = await response.json();
      setData(Data_);
    };
    FechData();
  }, []);
 
  const generateUsers = (): User[] => {
    var users: User[] = [];
    users = Data?.map((std: any, i: number) => {
      return {
        id: String(i+1).padStart(3, "0"),
        fullName: std.username,
        phone: std.phone_number,
        email: std.email,
        levels: std.level,
        subjects: std.modules_Groups_sessionNumber,
        role: `Student`,
      };
    });

    return users;
  };


  const placeholderUsers: User[] = generateUsers();

  return (
    <section className="w-full h-full grid grid-cols-6 grid-rows-6 gap-4 px-2">
      <Card className="col-span-4">
        <CardBody className="px-4 flex flex-col items-center justify-center gap-2">
          <div className="w-full flex gap-3">
            <Button variant="ghost" radius="sm" color="primary">
              Export CSV
            </Button>
            <Button
              as={Link}
              href="/dashboard/teachers/add"
              variant="solid"
              radius="sm"
              color="primary"
              className="shadow-md shadow-primary-300"
            >
              Add Teacher
            </Button>
          </div>

          <Input
            type="text"
            placeholder="Search for a teacher by id, name"
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
        role="teacher"
        search={search}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        enrolled
      />

      <UserInfo user={placeholderUsers[selectedUser ]} enrolled />
    </section>
  );
}

export default TeachersPage;
