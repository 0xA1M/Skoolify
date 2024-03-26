import dbConnect from "@/database/ConnectToDB";
import Student from "@/models/Student";
import { isObjectInArray } from "./checkExistence";

export async function Add_Student(data:any){
   await dbConnect();

    const is_exist=await Student.findOne(data)
    const is_inRequestList= await isObjectInArray(data)

  if(!is_exist && !is_inRequestList)
 {
  const newStudent= await new Student(data);
  await newStudent.save();
  return {data:"added"}
 }
  else
  { 
   let errorMessage = 'Error adding student';
   if (is_exist) {
     errorMessage = 'User exists';
   } else{
     errorMessage = 'User in request list';
    }
  
return {error:errorMessage};
  }
}