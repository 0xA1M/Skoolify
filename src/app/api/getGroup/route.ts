import { getGroup } from "@/actions/getGroup";
import dbConnect from "@/database/ConnectToDB";

export async function POST(request: Request) {
    await dbConnect();
    const res=await request.json();
    res.level=Number(res.level)
    const response=await getGroup(res)
     return Response.json(response)
     }