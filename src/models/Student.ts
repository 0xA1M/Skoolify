import {model ,Schema,models} from "mongoose"
const StudentSchema=new Schema ({
    username:String,
    password:String,
    modules_Groups_sessionNumber:Array,
    level:String,
    phone_number:String,
    email:String,
    gender:String,
    birthday:String
})
const Student=models.Student || model("Student",StudentSchema)
export default Student;