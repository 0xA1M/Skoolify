import Student from "@/models/Student";


export async function POST(request: Request) {
 try{
    const res=await request.json();
    console.log(res)
    const response= await Student.find();
    console.log(response)
    if(Number(res.id) > Number(response.length))
    {
        return new Response(JSON.stringify({Error:"This id in Invalid"}), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
    }
    const Result=response[Number(res.id)-1]
     return Response.json(Result);
  }
  catch(error)
  {
    return new Response(JSON.stringify({Error:"Internal Server Error "}), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
  }
}