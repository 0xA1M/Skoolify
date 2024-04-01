import dbConnect from "@/database/ConnectToDB";
import Admin from "@/models/Admin";
import Student from "@/models/Student";
import Teacher from "@/models/Teacher";
import { ESLINT_DEFAULT_DIRS } from "next/dist/lib/constants";

export async function isObjectInArray(data:any) {
    await dbConnect();
    const requests= await Admin.find();
    return requests[0].requests.some((user:any) => user.email==data.email);
}
// IS better to work with id 