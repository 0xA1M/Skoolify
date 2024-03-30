import {model ,Schema,models} from "mongoose"
const TeacherShema=new Schema ({
    username:String,
    password:String,
    modules_Groups:String,
    level:Array,
    phone_number:Number,
    email:String,
    gender:String,
    birthday:String
})
const Teacher=models.Teacher || model("Teacher",TeacherShema)
export default Teacher;