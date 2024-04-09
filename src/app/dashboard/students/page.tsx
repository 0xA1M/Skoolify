"use client";
/* Utils */
import { useState, ChangeEvent, useEffect } from "react";

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
import { Status } from "@/enums/Status";

function StudentPage() {
  const [search, setSearch] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [Data,setData]=useState([]);
  // i create enum (class for constants) to ensure that in backend we will recievre wo staus predefined(eccepted,request)
  // create toggle <accepted,request>to define wich category of sudent to show (accepted or in request) 
  const [status,Setstatus]=useState<Status>(Status.accepted)
  const [areEnrolled, setAreEnrolled] = useState<boolean>(false);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  /* This function is only for testing */
  useEffect(()=>{
   const FechData=async () => {
      const response = await fetch(`http://localhost:3000/api/getStudents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({status:status})
      });

      const Data_ = await response.json();
      setData(Data_)
       }
  FechData();
  },[])
 // console.log(Data)
  const generateUsers = (): User[] => {
    var users: User[] = [];
  users= Data?.map((std:any,i:Number)=>
    { 
       
    return {
      id: String(i).padStart(3, "0"),
      fullName: std.username,
      phone: std.phone_number,
      email: std.email,
      levels: [std.level],
      subjects:std.modules_Groups_sessionNumber ,
      role: `Student`,
  }
   })
     
    return users;
  };

  const placeholderUsers: User[] = generateUsers();

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

     {<UserInfo user={placeholderUsers[selectedUser ]} /> }
    </section>
  );
}

export default StudentPage;
