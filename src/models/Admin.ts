import {model ,Schema,models} from "mongoose"
const AdminSchema=new Schema ({
    username:String,
    password:String,
   requests:Array,
})
const Admin=models.Admin || model("Admin",AdminSchema)
export default Admin;
// emploi de temp : 7 jours/5 seance par jour /  object{module group la salle heure..}
/*
import {model ,Schema,models} from "mongoose"
const TeacherShema=new Schema ({
    username:String,
    password:String,
    modules_Groups:String,
    level:Number,
    phone_number:Number,
    email:String
})
const Teacher=models.Teacher || model("Teacher",TeacherShema)
export default Teacher;
*/
//-------------------------------------------------------------------
/*
import {model ,Schema,models} from "mongoose"
const StudentSchema=new Schema ({
    username:String,
    password:String,
    modules_Groups_sessionNumber:Array,
    level:Number,
    phone_number:Number,
    email:String
})
const Student=models.Student || model("Student",StudentSchema)
export default Student;
//modules_Groups_sessionNumbe contain object : module , array , sessionNumber
*/