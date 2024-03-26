import dbConnect from "@/database/ConnectToDB";
import Admin from "@/models/Admin";

export async function isObjectInArray(data:any) {
    await dbConnect();
    const requests= await Admin.find()
    return requests[0].requests.some((user:any) => user.username === data.username && user.password === data.password);
}