import {model ,Schema,models} from "mongoose"
const StudentSchema=new Schema ({
    username:String,
    password:String,
    modules_Groups_sessionNumber:Array,
    level:Number,
    phone_number:Number,
    email:String,
    gender:String,
    birthday:String
})
const Student=models.Student || model("Student",StudentSchema)
export default Student;