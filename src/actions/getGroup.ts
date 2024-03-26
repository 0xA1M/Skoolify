import dbConnect from "@/database/ConnectToDB";
import Student from "@/models/Student";


export async function getGroup(data:any):Promise<any>{
   await dbConnect();
   var students=await Student.find();
    students=students.filter((ele:any)=>ele.level==data.level)

  return students.filter(parentObject => 
    parentObject.modules_Groups_sessionNumber.some((nestedObject:any) => 
      nestedObject.module == data.module 
    ))

}
// data: level , module ,group