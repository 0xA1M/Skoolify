import dbConnect from "@/database/ConnectToDB";
import Notification from "@/models/Time_Planning";

export async function POST(request: Request) {
    dbConnect();
    const res = await request.json();
    console.log(res)
    const newNotification= await new Notification(res);
    await newNotification.save();
    return new Response(JSON.stringify("added"), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }