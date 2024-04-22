import Student from "@/models/Student";

function removeLeadingZeros(input: number): number {
    const resultString = input.toString().replace(/^0+/, '');
    return resultString === '' ? 0 : parseInt(resultString, 10);
  }
 export async function POST(request:Request){
    const res=await request.json();
    const response=await Student.find();
    const ID=removeLeadingZeros(res.id)
    console.log(ID)
    const DocumentID=response[ID]._id
    const result = await Student.findByIdAndUpdate(
           {_id : DocumentID},
        { $set: res.std },
        { new: true }
      );
    return Response.json("Updated")
 }    