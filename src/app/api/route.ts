//import {Add_Admin }from "@/actions/addAdmin"
//import { Get_Alladmin } from "@/actions/getAlladmins"
import dbConnect from "@/database/ConnectToDB";
import { Add_Request } from "@/actions/addRequest";
import { Add_Student } from "@/actions/acceptRequest";
import Admin from "@/models/Admin";
import Student from "@/models/Student";
import { Add_Group } from "@/actions/addGroup";
import Get_all_students from "@/actions/getAllusers";
//import { Add_Group } from "@/actions/addGroup";


export async function GET(request:Request) {
  await dbConnect();
//  const Admins=await Get_Alladmin();
  //console.log(Admins.Admins[0].studentsrequest[0])
  return Response.json("connected")
}
export async function POST(request: Request) {
 const res=await request.json();
 console.log(res);
 const response=await Get_all_students(res);
  return  new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
  }
  //mbouhlais
  //w3Okhop01eaqgctJ