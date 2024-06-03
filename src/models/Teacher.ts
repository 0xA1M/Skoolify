import { model, Schema, models } from "mongoose";

const TeacherSchema = new Schema({
  username: String,
  password: String,
  modules_Groups: String,
  level: Array,
  phone_number: Number,
  email: String,
  gender: String,
  birthday: String,
});

const Teacher = models.Teacher || model("Teacher", TeacherSchema);

export default Teacher;
