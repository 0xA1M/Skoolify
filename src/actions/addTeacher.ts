import dbConnect from "@/database/ConnectToDB";
import { isObjectInArray } from "./checkExistence";
import Teacher from "@/models/Teacher";

export async function Add_Teacher(data:any){
   await dbConnect();

    const is_exist=await Teacher.find(data)
    const is_inRequestList= await isObjectInArray(data)

  if(is_exist.length!=0 && !is_inRequestList)
 {
  const newTeacher= await new Teacher(data);
  await newTeacher.save();
  return {data:"added"}
 }
  else
  { 
   let errorMessage = 'Error adding ';
   if (is_exist.length!=0) {
     errorMessage = 'User exists';
   } else{
     errorMessage = 'User in request list';
    }
  
return {error:errorMessage};
  }
}