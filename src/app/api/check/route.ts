import { decrypt } from "@/Authorization/Encry_Dcry";
import dbConnect from "@/database/ConnectToDB";
import Admin from "@/models/Admin";
import Student from "@/models/Student";
import Teacher from "@/models/Teacher";

 export async function POST(request:Request){
    dbConnect();
    var res=await request.json();
    var Res=decrypt(res);
    var role;
    const student =await Student.findById(Res);
    const teacher =await Teacher.findById(Res);
    const admin =await Admin.findById(Res);
    if (student) {
        return Response.json("student")
    } else if (teacher) {
       return Response.json("teacher")
    } else if (admin) {
        return Response.json("admin")
    } else {
        return new Response(JSON.stringify({Error:"Error in Athentification"}), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
    }
    
 }    