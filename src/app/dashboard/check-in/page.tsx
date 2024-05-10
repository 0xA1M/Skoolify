"use client"
import UserInfo from "@/components/UI/UserInfo";
import { Avatar, Badge, Button, Divider, Image, Input, ScrollShadow, Skeleton, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, skeleton } from "@nextui-org/react";
import { ChangeEvent, useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
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
  const [Search,setSearch]=useState("");//this is the id entered by the user
  const [isLoading,SetisLoading] = useState<boolean>(false);// for loading
  const [count, setCount] = useState<number>(0)
  const [isSearch,MakeSearch]=useState<boolean>(false)
  const [isSucces,setSucces]=useState<boolean>(false)
  var {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [stds,setStds]=useState({stdID:"",sbjID:0})
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
  useEffect(()=>{},[isOpen])
    const FechData1 = async () => {
      MakeSearch(true)
      setError("")
      setSearch("")
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
  { setSucces(true)
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

// Modal component
const Modal_: React.FC<any>=() =>{

  return (
    <>
      <Modal
        backdrop="opaque" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          }
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Confirmation :</ModalHeader>
              <ModalBody>
                <p className=" mb-10">Do you Realy want to change his Session number</p>
                <p className=" mb-5">
                  * if number session arrive to zero the student account with the given id will 
                  be automaticly deactivated
                  </p>
                  <p>
                  * if stduent session is less than two warning notification will send to 
                  the student 
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={()=>{onClose();UpdateSession()}} >
                  Continue
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
//Update session
const UpdateSession= async () =>{
  const response = await fetch(`http://localhost:3000/api/checkIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stds),
  });
}
//Slekton component
const Skeleton_ =()=> {
  return (
    <div className="max-w-[300px] w-full flex justify-center items-center gap-3">
      <div>
        <Skeleton className="flex rounded-full w-12 h-12"/>
      </div>  
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-3 w-3/5 rounded-lg"/>
        <Skeleton className="h-3 w-4/5 rounded-lg"/>
      </div>
    </div>
  );
}
// Info Component (Represent almost all page)      
const Info = () => {
  return (<>
      {!isLoading ? (
        error === "" && isSucces ? (
          <>
            <div className="flex justify-around gap-5">
             
                <Table_ index={2} />
              
              <UserInfo user={User} enrolled />
            </div>
          </>
        ) : (
       <div className=" w-full flex flex-col items-center gap-5">
          <h1 className=" text-4xl text-red-600 font-extrabold">{error}</h1>
          <Image
          width={600}
          height={600}
          alt="Search"
          src="/404.png"
       />
       </div>
        )
      ) : (
        <Spinner size="lg" color="primary" />
      )}
    
  </>);
};

//  Tables Componentes (the page contain two tabels look to design)   
const Table_: React.FC<ITableProps> = ({index}) =>{
  if(index===1)
    {
  return(
       <Table removeWrapper className=" w-[70%] m-auto"  >
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
      <Table removeWrapper className=" w-[50%]  mt-10"  >
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
        <TableCell>
        <div className="flex justify-between">
          <h1>{ele.sessions}</h1>
         <Button   color="default" size="sm" onPress={()=>{onOpen();setStds({stdID:User.id,sbjID:key}) }} >
            Confirm
         </Button>
    </div>
        </TableCell>
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

    <ScrollShadow hideScrollBar className="w-full h-full">
 <div className=" flex flex-col  gap-16 max-h-screen ">
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
      <Divider orientation="horizontal" />
     { error==="" && isSearch && Search=="" && isSucces && <h1 className="text-4xl font-bold p-5 text-gray-600">Student Details:</h1>}
    {  !isSearch || Search!="" ?
       ( <div className="  m-auto gap-28">
          <Image
             width={500}
             height={500}
             alt="Search"
             src="/search.jpg"
          />
         </div>
       )
       :
       (
        <div className=" flex flex-col gap-20 ">
          {isLoading ?(
             <Skeleton_ />
          )
          :(
            error=="" && isSucces && <Table_ index={1} />
          )}
           <Info />
        </div>
        
       )
      
    }
    <Modal_  />
 </div>
 </ScrollShadow>
  );
}

export default CheckInPage;
