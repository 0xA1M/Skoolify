
import dbConnect from "@/database/ConnectToDB";
import Admin from "@/models/Admin";
import Student from "@/models/Student";
import Teacher from "@/models/Teacher";


export async function Add_Student(data: any): Promise<any> {
    await dbConnect();
    await Admin.findByIdAndUpdate(
        "6611cb9a82ab92f250989a74",
        { $pull:{ requests: data.info } }
    );
    try {

        if (data.role== "student" && data.state) {
            await new Student(data.info).save();
        } else {
            await new Teacher(data.info).save();
        }
        return;
    } catch (error)
     {
        console.error(error);
        throw new Error('Failed to add student.');
    }
}