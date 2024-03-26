
import { Add_Student } from "@/actions/addStudent";
import dbConnect from "@/database/ConnectToDB";

export async function POST(request: Request) {
    await dbConnect();
    const res=await request.json();
    const response=await Add_Student(res);
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