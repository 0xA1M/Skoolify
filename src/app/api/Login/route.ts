import dbConnect from "@/database/ConnectToDB";
import Admin from "@/models/Admin";
import Student from "@/models/Student";
import Teacher from "@/models/Teacher";

export async function POST(request: Request) {
    await dbConnect();
    var response:any;
    const res=await request.json();
    if(res.role==="student")
    {
        response=await Admin.findOne(res);
    }
    else if(res.role==="teacher")
    {
        response=await Student.findOne(res);
    }
    else
    {
        response=await Teacher.findOne(res);
    }    
    
    if(response)
    {
        return new Response(JSON.stringify("Success"), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
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