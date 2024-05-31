
import { Add_Student } from "@/actions/acceptRequest";
import Admin from "@/models/Admin";

export async function POST(request:Request){
    const res=await request.json();
    const users=await Admin.find();
    console.log(res.id)
    const user=users[0].requests[res.id];
    const data = 
    {
        status:res.status,
        info:user
    }
    const response=await Add_Student(data);
    return Response.json("added")
 }    