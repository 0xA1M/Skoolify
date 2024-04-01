import dbConnect from "@/database/ConnectToDB";
import Student from "@/models/Student";
import { isObjectInArray } from "./checkExistence";

export async function Add_Student(data:any){
   await dbConnect();

    const is_exist=await Student.find({email:data.email})
    const is_inRequestList= await isObjectInArray(data)

  if(true)
 {
  const newStudent= await new Student(data);
  await newStudent.save();
  return {data:"added"}
 }
  else
  { 
   let errorMessage = 'Error adding student';
   console.log(is_exist)
   if (is_exist.length!=0) {
     errorMessage = 'User exists';
   } else{
    console.log(is_inRequestList)
     errorMessage = 'User in request list';
    }
  
return {error:errorMessage};
  }
}