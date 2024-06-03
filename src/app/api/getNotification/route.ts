import { decrypt } from "@/Authorization/Encry_Dcry";
import Student from "@/models/Student";
import Notification from "@/models/Time_Planning";
import { cookies } from "next/headers";

export async function POST(request:Request){
    const res=await request.json()
    console.log(cookies().get("token"))
    const id:string=String(cookies().get("token")?.value);
    const std=await Student.findById(decrypt(id));
     const notifications= await Notification.find({sender:std.email})
       return Response.json(notifications);
 }    