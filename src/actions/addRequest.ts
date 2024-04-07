
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
            return;
        }
                }
        else
        {
            let errorMessage = 'This email is already used';
            return {error:errorMessage}
        }

        console.log("Update successful");
    } catch (error) {
        console.error("Error updating document:", error);
        throw error; // Rethrow or handle as needed
    }
}


//await user.updateOne({_id:user_.user_id},{$push:{request:friend_id}})