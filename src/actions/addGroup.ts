import Admin from "@/models/Admin";

import Teacher from "@/models/Teacher";
import { isModuleInArray } from "./checkRegModule";
import dbConnect from "@/database/ConnectToDB";
import { Add_Student } from "./addStudent";
import Student from "@/models/Student";


export async function Add_Group (data:any){
 await dbConnect();
 
const result= await Promise.all(data.map(async(user:any,index:any)=>{
      if(user.id)
      {
        console.log(user)
        const registred_in_module= await isModuleInArray(user.id,user.module);
        console.log(registred_in_module);
          if(registred_in_module)
          { 
           return "exist"
          }
          else
          {
            await Student.findByIdAndUpdate(
              user.id,
             { $pull:{ modules_Groups_sessionNumber:{module:user.module,group:"4",session:user.session} } } );
          }
      }
      else
      {
        await Add_Student(data,4)
      }
     }))
     return result

} 
// in front : button add student -->new student ,student already registred ,check request student 
  //student already registred : 1) send his id 2)check if student is not registred in this module 3) update his module_G array 3
  //check request :0)accept him   GO TO FIRST   1) send its infos 2)UPDATE its data
  //new students ; 0)check if student do not already exist 1)send its info and add him 
  // if this group number is valid;
//choose etudiant accepted 
// data is object contain : array of student [{name,password}] , teacher ,level 
// WE WILL SEND AT LEAST ARRAY OF TEN STUDENTS (GROUP CONTAIN AT LEAST 10 PERSON)
//we should create group number based on other group number used
// if we have time we add change group..............