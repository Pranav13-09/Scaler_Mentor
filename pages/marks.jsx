import React, { useState,useEffect } from 'react';
import StudentMarksForm from "../Components/StudentMarksForm"
import axios from "axios"
import { useRouter } from "next/router";
import { CSVLink } from "react-csv";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/Components/Loader';


const StudentMarks = () => {

    const [students,setStudents] = useState([]);
    const [isFinalized,setIsFinalized] = useState(false);
    const[isGrouped,setIsGrouped] = useState(false);
    const router = useRouter();
    const[loading,setLoading] = useState(false)
    const[txt,setTxt] = useState("Finalize")
 

  const handleUpdateMarks = async(rollNumber, marks) => {
    try{
      const response = await axios.post("/api/marks",{
            marks:marks,
            rollNumber,
            mentorId : "6528cb9fb4322259507b2233"
          })
          console.log(response,"i am response")
          router.reload()
          toast.success("Marks Successfully Updated")

    }catch(err){
      console.log(err,'i am error')
      if(err.response.data.message=="Mentor not found"){
        toast.error("You are not authorized to perform this action")
      }else if(err.response.data.message=="Student not found"){
        toast.error("Student not found in database")
      }else{
        toast.error("Internal Server Error")
      }
    }
    
  };

    useEffect(() => {
      fetchStudents()
    }, [])

    const fetchStudents = async () => {
    console.log("fetching students")
    setLoading(true)
         try {
           const response = await axios.get('/api/student/myStudent', {
             params: {
               mentorId : "6528cb9fb4322259507b2233"
             }
           }); 
           console.log(response, "i am response students")
           const required = response.data.student;
           console.log(required,"i am the reqired array of the numbers")
           setStudents(required)
           setIsGrouped(response.data.isGrouped)
           setIsFinalized(response.data.isFinalized)
       
    } catch (error) {
      console.error('Error fetching roll numbers:', error);
    }
    setLoading(false)
      }


      const areAllCriteriaFilledForAllStudents = (students) => {
      for (const student of students) {
        if (!areAllCriteriaFilledForStudent(student)) {
          return false;
        }
      }
      return true;
    };

    const areAllCriteriaFilledForStudent = (student) => {
      const criteria = ['idea_score', 'pitch_score', 'execution_score', 'research_score', 'market_score'];
      for (const criterion of criteria) {
        if (!student[criterion]) {
          return false;
        }
      }
      return true;
    };

      const handleFinalMarkUpdate = async()=>{
        setTxt("Finalizing...")
       
          if (areAllCriteriaFilledForAllStudents(students)) {
            try{
              const response = await axios.post("/api/marks/finalize",{
                mentorId : "6528cb9fb4322259507b2233",
                isFinalized : true
              });
            
            router.reload()
              toast.success("Marks of student Finalized. Now you can download the pdf")
            console.log(response,"i am response")
            }catch(err){
              console.log(err);
            }
       setTxt("Finalize")
      

      } else {
        console.log("i am here")
      toast.error("Please evaluate all students before finalizing marks, as some of them have not been assessed yet")
      }
      }

  if(loading){
    return (
      <Loader/>
    )
  }

  if(!isGrouped){
    return(
   <>
  <div className="bg-blue-100 p-4 rounded-md text-center mb-4 mt-20">
     <p className="text-blue-700">
    Form a group in order to facilitate the process of assigning marks
  </p>
  <img src="/page-not-found.png" alt="Image Description" className="my-4 mx-auto" />
 
</div>
   </>
    )
  }

  return (
    <>

     <div className="max-w-screen-lg mx-auto p-6 mt-20">

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
          <h1 className="text-2xl mb-2 lg:mb-0">Student Marks</h1>
          {isFinalized ?  
                  <CSVLink
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                data={students}
                style={{
                  textDecoration: "none",
                }}
                filename="StudentMarks.csv"
              >
                Export Marks as CSV
              </CSVLink>
           :
            <button
            onClick={handleFinalMarkUpdate}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      
          >
            {txt}
          </button>
        }

        </div>
      {students.map((student) => (
        <StudentMarksForm key={student._id} student={student} onUpdateMarks={handleUpdateMarks} isFinalized={isFinalized}/>
      ))}
    </div>
     <ToastContainer
          position="top-right"
          autoClose={4000}
          className=" font-medium"
        />
    </>
   
  );
};

export default StudentMarks;