import dbConnect from "@/database/ConnectToDB";
import { Status } from "@/enums/Status";
import Admin from "@/models/Admin";
import Student from "@/models/Student";

export async function POST(request: Request) {
    await dbConnect();
    const res=await request.json();
    var response=[];
    if(res.status===Status.accepted)
    {
     response= await Student.find();
    }
    else
    {
     response= await Admin.find();
     response=response[0].requests
    }
    console.log(response)
     return Response.json(response)
     }