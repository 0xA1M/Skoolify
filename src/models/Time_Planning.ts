import {model ,Schema,models} from "mongoose"
const NotificationShema=new Schema ({
  sender:String,
  content:String,
  Date:String
})
const Notification=models.Notification || model("Notification",NotificationShema)
export default Notification;
//if i need to find plannig i need to find its group ,module,level to search in DB
//in front end when i click on div we need and chanfe and submit we will send data to back end and save it.
