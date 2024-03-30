import {model ,Schema,models} from "mongoose"
const PlanningShema=new Schema ({
    hour:Number,
    module:String,
    group:Number,
    level:Number
})
const Planning=models.Plannig || model("Planning",PlanningShema)
export default Planning;
//if i need to find plannig i need to find its group ,module,level to search in DB
//in front end when i click on div we need and chanfe and submit we will send data to back end and save it.
