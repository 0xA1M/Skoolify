import dbConnect from "@/database/ConnectToDB";
import Admin from "@/models/Admin";
import Student from "@/models/Student";
import Teacher from "@/models/Teacher";
import { encrypt } from "@/Authorization/Encry_Dcry";

export async function POST(request: Request) {
    await dbConnect();
    var response:any;
    const res=await request.json();
    if(res.role==="student")
    {
        delete res.role
        response=await Student.findOne(res);

    }
    else if(res.role==="teacher")
    {
        delete res.role
        response=await Teacher.findOne(res);
    }
    else
    {   delete res.role
        response=await Admin.findOne(res);
    }    
   
    if(response)
    {

        return new Response(JSON.stringify(encrypt(String(response._id))), {
            status: 200,
            headers: { 
            'Content-Type': 'application/json'
             }
          });
    }
    else
    {
        return new Response(JSON.stringify({error:"Email or Password are incorrect"}), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
    }
     }