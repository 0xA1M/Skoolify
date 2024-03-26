import dbConnect from "@/database/ConnectToDB";
import Student from "@/models/Student";

export async function isModuleInArray(id:any,module:any){
  await dbConnect();
 const student=await Student.findById(id);
  return student.modules_Groups_sessionNumber.some((user:any) => user==module);
}
//data object contain username,password(we can add more attribute)