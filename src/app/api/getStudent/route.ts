import Student from "@/models/Student";

export async function POST(request: Request) {
    const res=await request.json();
    const response=await Student.findById(res.id);
     return Response.json(response)
     }