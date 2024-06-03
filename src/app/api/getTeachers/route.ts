import dbConnect from "@/database/ConnectToDB";
import { Status } from "@/enums/Status";
import Admin from "@/models/Admin";
import Teacher from "@/models/Teacher";

export async function POST(request: Request) {
  await dbConnect();

  const req = await request.json();
  let response = [];

  if (req.status === Status.accepted) {
    response = await Teacher.find();
  } else {
    response = await Admin.find();
    response = response[0].requests.filter(
      (request: any) => request.role == "teacher"
    );
  }

  return Response.json(response);
}
