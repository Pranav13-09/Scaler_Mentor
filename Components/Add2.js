import React, { useState, useEffect } from 'react';
import axios from "axios"
import { useRouter } from "next/router";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';


const AddStudents = () => {
const router = useRouter();
  const [students, setStudents] = useState([
    { firstname: '', lastname: '', rollNumber: '', topic: '' ,isValidated:false},
    { firstname: '', lastname: '', rollNumber: '', topic: '',isValidated:false },
    { firstname: '', lastname: '', rollNumber: '', topic: '', isValidated: false },
     { firstname: '', lastname: '', rollNumber: '', topic: '',isValidated:false },
  ]);
   
  const [rollNumbers, setRollNumbers] = useState([]);
  const [isGrouped, setIsGrouped] = useState(false);
  const[loading,setLoading] = useState(false)

  const handleValidate = async (e,studentIndex) => {
      e.preventDefault()
      console.log(studentIndex,"i am index")
        const rollNumberToValidate = students[studentIndex].rollNumber;
        console.log(rollNumberToValidate,"i am the roll number to validate")

  try {
    const response = await axios.get(`/api/student/roll`, {
  params: {
        rollNumber: rollNumberToValidate,
    mentorId : "6528cb9fb4322259507b2233"
  }
    });
    
    console.log(response,"i am response of validate")

  
    const { first_name, last_name, topic } = response.data;

    console.log(first_name,last_name,"i am here")


      const updatedStudents = [...students];
  updatedStudents[studentIndex] = {
    ...updatedStudents[studentIndex],
    firstname : first_name,
    lastname:last_name,
    topic,
    isValidated: true
    };
    console.log(updatedStudents[studentIndex],"i am the one you looking for")
    setStudents(updatedStudents);
    toast.success("Student added successfully")
  
  } catch (error) {
  
    if (error.response.data.message == "Student is already assigned to other mentor") {
      console.log("I am here okk")
     toast.error("Student is already assigned to other mentor")
    } else if (error.response.data.message == "Student with given roll number does not exist") {
      toast.error("Student with given roll number does not exist")
    }
    console.error('Error fetching student data:', error);
  }
};
   

    useEffect(() => {
    // Fetch the roll numbers of all students initially
      fetchRollNumbers();
      fetchStudents()
    }, []);
  
  const fetchStudents = async () => {
    setLoading(true)
    console.log("fetching students")
         try {
           const response = await axios.get('/api/student/myStudent', {
             params: {
               mentorId : "6528cb9fb4322259507b2233"
             }
           }); 
           console.log(response, "i am response students")
           const required = response.data.student;
           setIsGrouped(response.data.isGrouped)
         const updatedStudents = students.map((student, index) => {
           const responseStudent = required[index]; 
           console.log(responseStudent,"i am responseStudent inside")
           if (responseStudent !== undefined) {
                console.log("I am inide the return okk")
                return {
                  ...student,
                  firstname: responseStudent.first_name,
                  lastname: responseStudent.last_name,
                  rollNumber: responseStudent.roll_no,
                  topic: responseStudent.topic,
                  isValidated: true
                };
           }
           return null;
             
         }).filter(student => student !== null);
           console.log(updatedStudents,"i am updated students okk")

           setStudents(updatedStudents);
       
    } catch (error) {
      console.error('Error fetching roll numbers:', error);
    }
    setLoading(false)
  }

  const fetchRollNumbers = async () => {
    try {
        const response = await axios.get('/api/student'); 
        console.log("i am the response", response)
        const required = response.data.map(student => student.roll_no);
        setRollNumbers(required);
       
    } catch (error) {
      console.error('Error fetching roll numbers:', error);
      toast.error("Server Error.Please Refresh Page")
    }
  };
    
  const handleStudentChange = (index, field, value) => {
    const updatedStudents = [...students];
      updatedStudents[index].rollNumber= value;
      
      console.log(updatedStudents,"i am updatedStudents")
    setStudents(updatedStudents);
  };

  const handleAddStudent = () => {
    if (students.length < 4) {
      setStudents([...students, { firstname: '', lastname: '', rollNumber: '', topic: '' }]);
    }
  };

  const handleRemoveStudent = (index) => {
    if (students.length > 3) {
      const updatedStudents = students.filter((_, i) => i !== index);
      setStudents(updatedStudents);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    let totStudents = 0;
    for (const student of students) {
      if (student.isValidated = true) {
        totStudents++;
          }
    }

    if (totStudents > 4) {
      toast.error("You can only add maximum of 4 students");
      return;
    } else if (totStudents < 3) {
      toast.error("You must add minimum of 3 students");
      return;
    }

    try {
       const response = await axios({
        method: "POST",
        url: `/api/group`,
        data: {
          mentorId : "6528cb9fb4322259507b2233"
        },
       });
      
      console.log(response, "i am response")
      if (response.data.success) {
        setIsGrouped(true);
      }

      toast.success("Group Created Successfully")

    } catch (err) {
      console.log(err);
      toast.error("Server Error.Please Try Again")

    }

  };

  const handleRemove = async (e, rollNumber) => {
    console.log("i am in the ReAssign")
    e.preventDefault();

    try {
      const response = await axios.post("/api/student/remove", {
      data: {
        mentorId: "6528cb9fb4322259507b2233",
        rollNumber,
      }
      })
      toast.success("Student removed Successfully")
    } catch (err) {
      console.log(err);
      if (err.response.data.message == "Mentor not found") {
        toast.error("You are not Authorized")
      } else if (err.response.data.message == "Student not found") {
        toast.error("Student not found in database")
      } else {
        toast.error("Internal Server Error")
      }
      
    }
   
    router.reload();
  }

  if (loading) {
    return (
      <Loader/>
    )
  }

  return (
    <>
      {/* <Navbar/> */}
    
      <div className="flex justify-center lg:items-center  md:mt-24">
      <div className="max-w-screen-lg p-6 bg-white rounded shadow-lg w-full">
        <h2 className="text-2xl mb-4">Student Information</h2>
        <form  className="space-y-4">
          {students.map((student, index) => (
            <div key={index} className="space-y-2">
              <label className="block font-bold mb-1">Student {index + 1}</label>
              <div className="flex space-x-2 mb-2">
              
                {
                  !isGrouped ?   <select
                value={student.rollNumber}
                onChange={(e) => handleStudentChange(index, 'rollNumber', e.target.value)}
                    className="w-1/2 p-2 border border-gray-300 rounded"
                    disabled={student.isValidated}
                >
                <option value="">Select Roll Number</option>
                {rollNumbers.map((rollNumber, idx) => (
                    <option key={idx} value={rollNumber}>
                    {rollNumber}
                    </option>
                ))}
                  </select>
                    :
                    ""
                }
            
                {

                  !isGrouped ?
                  student.isValidated ? 
                   <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => handleRemove(e,student.rollNumber)}>
                        Remove Student
                        </button>
                  : 
                     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => handleValidate(e, index)}>
                        Validate
                      </button>
                    
                    :
                    ""
                }

                     </div>
                
               
                
              {student.isValidated && (
                <>
               
               <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="firstname"
                  value={student.firstname}
               
                  className="w-1/2 p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="lastname"
                  value={student.lastname}
               
                  className="w-1/2 p-2 border border-gray-300 rounded"
                />
                </div>
                
              <div className="flex space-x-2 mb-2">
                  <input
                  type="text"
                  placeholder="firstname"
                  value={student.rollNumber}
                  
                  className="w-1/2 p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="lastname"
                  value={student.topic}
                  className="w-1/2 p-2 border border-gray-300 rounded"
                />
              </div>
              </>

                    )}

              {students.length > 3 && !student.isValidated &&  !isGrouped && (
                <button
                  type="button"
                  className="w-full bg-red-500 text-white p-2 rounded"
                  onClick={() => handleRemoveStudent(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {students.length < 4 &&  !isGrouped &&  (
            <button type="button" onClick={handleAddStudent} className="w-full bg-green-500 text-white p-2 rounded">
              Add Student
            </button>
            )}
            
            {
              !isGrouped ?
            <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded mt-4" onClick={handleSubmit}>
            Submit
          </button>
                :
                <div className="mt-4 text-center text-blue-500">
                  You have established a group, and you are now able to allocate marks to its members.
                </div>

             } 

        </form>
        </div>
         <ToastContainer
              position="top-right"
              autoClose={4000}
              className=" font-medium"
            />
    </div>
    </>
   
  );
};

export default AddStudents;
