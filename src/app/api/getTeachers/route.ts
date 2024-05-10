import dbConnect from "@/database/ConnectToDB";
import { Status } from "@/enums/Status";
import Admin from "@/models/Admin";
import Teacher from "@/models/Teacher";

export async function POST(request: Request) {
    await dbConnect();
    const res=await request.json();
    var response=[];
    if(res.status===Status.accepted)
    {
     response= await Teacher.find();
    }
    else
    {
     response= await Admin.find();
     response= response[0].requests.filter((request:any) => request.role == 'teacher');
    }
    console.log("request get it")
     return Response.json(response)
     }