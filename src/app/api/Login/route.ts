import dbConnect from "@/database/ConnectToDB";
import Admin from "@/models/Admin";

export async function POST(request: Request) {
    await dbConnect();
    var response:any;
    const res=await request.json();
    response=await Admin.findOne(res);
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