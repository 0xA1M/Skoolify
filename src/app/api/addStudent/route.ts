import { Add_Student } from "@/actions/addStudent";
import { Add_Teacher } from "@/actions/addTeacher";
import dbConnect from "@/database/ConnectToDB";

export async function POST(request: Request) {
    await dbConnect();
    var response:any;
    const res=await request.json();
    if(res.role=="teacher")
    {
        response=await Add_Teacher(res.data);
        
    }
    else{
        response=await Add_Student(res.data);
    }
    if(!response.error)
    {
        return new Response(JSON.stringify(response), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
    }
    else
    {
        return new Response(JSON.stringify({ error:response.error }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
    }
     }