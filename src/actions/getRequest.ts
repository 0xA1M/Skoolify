import dbConnect from "@/database/ConnectToDB";
import Admin from "@/models/Admin";

export default async function get_Request(){
    await dbConnect();
    const requests= await Admin.find();
    return requests[0].requests;
}