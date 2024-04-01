import { Add_Request } from "@/actions/addRequest";
import dbConnect from "@/database/ConnectToDB";

export async function POST(request: Request) {
    await dbConnect();
    var response:any;
    const res=await request.json();
    response=await Add_Request(res);
    console.log(response)
    if(!response.error)
    {
        return new Response(JSON.stringify(response), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
    }
    else
    {
        return new Response(JSON.stringify(response), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
    }
     }