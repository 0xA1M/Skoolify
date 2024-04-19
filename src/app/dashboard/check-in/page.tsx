"use client"
import UserInfo from "@/components/UI/UserInfo";
import { Avatar, Badge, Button, Input, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { ChangeEvent, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
// Interfaces
interface ITableProps {
  index: number; 
}
//types
import type { User } from "@/components/UI/UsersGrid";
function CheckInPage() {
  var user:User ;
  const [MakeSearch,setMakeSearch]=useState<boolean>(true) //this used when page is rendred just to show "make reasrch" for the firt time
  const [Search,setSearch]=useState("");//this is the id entered by the user
  const [isLoading,SetisLoading] = useState<boolean>(false);// for loading
  const [User,setUser]=useState<User>({
    id: Search,
    fullName:"isle nouhals",
    phone: "21",
    email: "sllsslssjjs@gami",
    levels: ["slsl"],
    subjects: [],
    role: `Student`,
  })// this is Data variable (wich in the next defined in the next line)  but mofied so i can use Infouser component
  const [Data, setData] = useState({modules_Groups_sessionNumber:[],username:"Not Found",email:"Not Found"});// user data form back end
  const [error,setError]=useState("")
    const FechData1 = async () => {
    
      setError("")
      setMakeSearch(false)
      SetisLoading(true)
      const response = await fetch(`http://localhost:3000/api/getStudent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id:Search}),
      });
 if(!response.ok)
  {    const Data_ = await response.json();
       setError(Data_.Error)
  }
  else
  {
    const Data_ = await response.json();
    console.log(Data_)
      setData(Data_);
      user={
        id: Search,
        fullName:Data_.username,
        phone: Data_.phone_number,
        email: Data_.email,
        levels: [Data_.level],
        subjects: Data_.modules_Groups_sessionNumber,
        role: `Student`,
      }
      setUser(user)
      
  }
  setTimeout(() => {SetisLoading(false)}, 2000);
    };
// Info Component (Represent almost all page)      
const Info = () => {
  return (
    <div className="flex  flex-col gap-24">
      {!isLoading ? (
        error === "" ? (
          <>
            <Table_ index={1} />
            <div className="flex  justify-between min-w-[900px] max-h-[500px]">
              <Table_ index={2} />
              <UserInfo user={User} enrolled />
            </div>
          </>
        ) : (
          <h1 className="m-auto text-red-600 font-extrabold">{error}</h1>
        )
      ) : (
        <Spinner size="lg" color="primary" />
      )}
    </div>
  );
};

//  Tables Componentes (the page contain two tabels look to design)   
const Table_: React.FC<ITableProps> = ({index}) =>{
  if(index===1)
    {
  return(
       <Table removeWrapper className=" w-[70%] m-auto" >
        <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>ID</TableColumn>
        <TableColumn>Email</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>{Data.username}</TableCell>
          <TableCell>{Search}</TableCell>
          <TableCell>{Data.email}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
  }
  else{
    return(
      <Table removeWrapper className=" w-[50%] " >
      <TableHeader>
      <TableColumn>Subject</TableColumn>
      <TableColumn>Group</TableColumn>
      <TableColumn>Session</TableColumn>
    </TableHeader>
    <TableBody>
      {Data.modules_Groups_sessionNumber.map((ele:any,key:any)=>{
        return(
          <TableRow key={key}>
        <TableCell>{ele.subject}</TableCell>
        <TableCell>{ele.group}</TableCell>
        <TableCell>{ele.session}</TableCell>
      </TableRow>
        )
      })}
    </TableBody>
  </Table>
    )
  }
}

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    setError("")
  };
  return(
 <div className=" flex flex-col gap-3 max-h-screen ">
    <div className=" w-full flex justify-end ">
        <Badge color="danger" content={5}  shape="circle">
        <IoNotificationsOutline size={25} />
        </Badge>
     </div>
     {/* ------------------------------------------------------------ */}
     <div className=" w-full flex items-center justify-center">
        <h1 className=" text-gray-600 text-3xl font-serif">Check In</h1>
     </div>
     {/* ----------------------------------------------------------------- */}
     <div className=" flex justify-center gap-3 w-full">
     <Input
            type="text"
            className=" w-[80%]"
            placeholder="Search for a student By his ID"
             value={Search}
            onChange={handleSearch}
           isClearable
            onClear={() => setSearch("")}
            startContent={<CiSearch size={22} />}
          />
         <Button onClick={FechData1}>Search</Button> 
      </div>
      {/* ------------------------------------------------------------------------ */}
    { MakeSearch ? 
       ( <div className=" flex justify-center items-center h-96">
         <h1>Please Make Research .....</h1>
         </div>
       )
       :
       (
          <Info />
       )
      
    }
 </div>

  );
}

export default CheckInPage;
