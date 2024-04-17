import dbConnect from "@/database/ConnectToDB";
import Teacher from "@/models/Teacher";


export async function GET(request: Request) {
    dbConnect();
    const response=await Teacher.find();
     return Response.json(response)
     }