import dbConnect from "@/database/ConnectToDB";
import Student from "@/models/Student";
import Teacher from "@/models/Teacher";
export default async function  Get_all_students(data:any){
 await dbConnect();
 console.log(data)
 if(data.user=="student"){
  const users=await Student.find();
   //console.log(users)
    return users
 }else{
   if(data.user=="teacher"){
      return await Teacher.find();
   }else{
      return{
         students:await Student.find(),
         teachers:await Teacher.find()
      }
   }
   
 }
}