import React,{useState} from "react"; 

export const Student = () => {
<h1>student List</h1>
const Stu = [
"pratik",
"sam",
"pratiksha",
"pratiksh",
"jon",
"pratiksh",
"kiran"]

const [StudentData,setStudentData]= useState(Stu);
const [searchTerm, setSearchTerm] = useState("");
const handleInputchage = (e) => {
setSearchTerm(e.target.value);
};
const filteredstudents = StudentData.filter((Stu) =>
Student.toLowerCase().includes(searchTerm.toLowerCase()))
return (
<div>
<input type="text" placeholder="enter student" onChange={handleInputchage}/>
{filteredstudents.map((Stu) => {
  return <p> {Stu}</p>;
})}
<h1>student list</h1>
</div>
);
}
export default Student;