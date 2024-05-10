import dbConnect from "@/database/ConnectToDB";
import Student from "@/models/Student";

export async function POST(request: Request) {
    await dbConnect();
    const res=await request.json();
    const std=await Student.find();
    const i=std[Number(res.stdID)-1].modules_Groups_sessionNumber[Number(res.sbjID)].sessions -1;
    console.log(i)
    console.log(res)
    Student.findByIdAndUpdate(
        std[Number(res.stdID)-1]._id,
        { $set: { [`modules_Groups_sessionNumber.${Number(res.sbjID)}.sessions`]: i } },
        { new: true }
    ).then(updatedDocument => {
        console.log(updatedDocument);
      }).catch(err => {
        console.error(err);
      })
      
     return Response.json("Updated")
     }