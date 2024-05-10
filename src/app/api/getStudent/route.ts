import dbConnect from "@/database/ConnectToDB";
import Student from "@/models/Student";
export async function POST(request: Request) {
 try{
    const res=await request.json();
    console.log(res)
    dbConnect();
    const response= await Student.find();
    console.log(response)
    if(Number(res.id) > Number(response.length))
    {
        return new Response(JSON.stringify({Error:"This id in Invalid"}), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
    }
    var Result=response[Number(res.id)-1]
    const filteredModules = Result.modules_Groups_sessionNumber.filter((module:any) => module.sessions !== 0);
     Result.modules_Groups_sessionNumber=filteredModules;
    if(Result.modules_Groups_sessionNumber.length===0)
      {
        return new Response(JSON.stringify({Error:"This Student have no remaining Session in any modules (inactive account)"}), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
     return Response.json(Result);
  }
  catch(error)
  { 
    console.log(error)
    return new Response(JSON.stringify({Error:"Internal Server Error "}), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
  }
}