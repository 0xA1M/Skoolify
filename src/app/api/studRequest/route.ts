import { Add_Student } from "@/actions/acceptRequest";
import get_Request from "@/actions/getRequest"
export async function GET() {
    const response=await get_Request();
     return Response.json(response)
     }
 export async function POST(request:Request){
    const res=await request.json();
    const response=await Add_Student(res);
    return Response.json("added")
 }    