
import dbConnect from "@/database/ConnectToDB";
import Admin from "@/models/Admin";
import { isObjectInArray } from "./checkExistence";

export async function Add_Request(data:any):Promise<any> {
    try {
        await dbConnect();
        const is_there= await isObjectInArray(data);
       if(!is_there){ 
        if(data.role == "student")
         {
            console.log("Adding student request");
            await Admin.findByIdAndUpdate(
                "6611cb9a82ab92f250989a74",
                { $push:{ requests: data } }
            );

        } 
        else
         {
            console.log("Adding teacher request");
            await Admin.findByIdAndUpdate(
                "6611cb9a82ab92f250989a74",
                { $push: {requests: data} }
            );
            return "added";
        }
                }
        else
        {
            return {error: 'This email is already used'}
        }

    } catch (error)
     {
            return {error:'Unkonwn Error'}
        return 
    }
}


//await user.updateOne({_id:user_.user_id},{$push:{request:friend_id}})