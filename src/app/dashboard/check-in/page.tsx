import { Avatar, Badge, Input } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";


function CheckInPage() {
  return(
 <div className=" flex flex-col gap-6">
    <div className=" w-full flex justify-end p-5">
        <Badge color="danger" content={5}  shape="circle">
        <IoNotificationsOutline size={25} />
        {/* <Avatar src={user} /> */}
        </Badge>
     </div>
     {/* ------------------------------------------------------------ */}
     <div className=" w-full flex items-center justify-center">
        <h1 className=" text-gray-600 text-3xl font-serif">Check In</h1>
     </div>
     {/* ----------------------------------------------------------------- */}
     <div className=" flex justify-center">
     <Input
            type="text"
            className=" w-[80%]"
            placeholder="Search for a student By his id or Username"
            // value={search}
            //onChange={handleSearch}
           isClearable
            //onClear={() => setSearch("")}
            startContent={<CiSearch size={22} />}
          />
      </div>
 </div>

  );
}

export default CheckInPage;
