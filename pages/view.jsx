import React, { useState, useEffect } from 'react';
import axios from "axios"

import Criteria from '@/Data/criteria';
import { FaAngleDown } from 'react-icons/fa';
import Loader from '@/Components/Loader';

const ViewStudentsPage = () => {
 
    
  const [students, setStudents] = useState([]);
  const [filtereredData, setFilteredData] = useState([])
  const[loading,setLoading] = useState(false)
  const [filterType, setFilterType] = useState("All")
  const[dropdownOpen,setDropdownOpen]=useState(false)

  const fetchStudents = async () => {
    setLoading(true);
    console.log("fetching students")
         try {
           const response = await axios.get('/api/student/myStudent', {
             params: {
               mentorId : "6528cb9fb4322259507b2233"
             }
           }); 
           console.log(response, "i am response students")
           const required = response.data.student;
           console.log(required,"i am the reqired array of the numbers")
             const transformedData = required.map((student) => {
                 const {
                     pitch_score,
                     idea_score,
                     market_score,
                     research_score,
                     execution_score,
                     first_name,
                     last_name,
                     roll_no,
                     total_score
                 } = student;

                 const criteriaScores = [pitch_score || 0,idea_score || 0, market_score  || 0, research_score  || 0, execution_score  || 0 ];

            return {
                rollNumber: roll_no,
                fullName: first_name + " " + last_name,
                totalScore:total_score || 0,
                criteriaScores
            };
             });
             
           setStudents(transformedData)
           setFilteredData(transformedData)
  
       
    } catch (error) {
      console.error('Error fetching roll numbers:', error);
    }
    setLoading(false)
  }
  
  const handleFilterChanges = (criteria) => {
    console.log(criteria,"I am here")
    if (criteria == "All") {
      setFilteredData(students)
    } else if (criteria == "MarksAssigned") {
      const updatedStudents = students.filter((student) => student.totalScore > 0 );
      setFilteredData(updatedStudents)
    } else if (criteria == "MarksNotAssigned") {
      const updatedStudents = students.filter((student) => student.totalScore === 0);
      setFilteredData(updatedStudents)
    }
  }
    
    useEffect(() => {
      fetchStudents()
    }, [])
  
    if(loading){
    return (
      <Loader/>
    )
  }

    return (
        <>
 
       <div className="container mx-auto p-6 mt-20">
          <h1 className="text-2xl mb-4 text-center">View Students and Marks</h1>

          <div className="flex items-center justify-end mb-4">
          <div className="relative inline-block text-left">
            <div className="flex items-center">
              <span className="rounded-md shadow-sm">
               <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                id="options-menu"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                    { filterType}<FaAngleDown className="-mr-1 ml-2 h-5 w-5" />
            </button>
              </span>
            </div>

            {dropdownOpen && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div className="py-1">
                  <button
                    className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                    onClick={() => {
                      setFilterType('All');
                      handleFilterChanges("All")
                      setDropdownOpen(false);
                    }}
                  >
                    All
                  </button>
                  <button
                    className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                    onClick={() => {
                      setFilterType('MarksAssigned');
                      handleFilterChanges("MarksAssigned")
                      setDropdownOpen(false);
                    }}
                  >
                    Marks Assigned
                  </button>
                  <button
                    className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                    onClick={() => {
                      setFilterType('MarksNotAssigned');
                       handleFilterChanges("MarksNotAssigned")
                      setDropdownOpen(false);
                    }}
                  >
                    Marks Not Assigned
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

 


      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="border p-2">Roll Number</th>
              <th className="border p-2">First Name</th>
              <th className="border p-2">Total Score</th>
              <th className="border p-2">Criteria Scores</th>
            </tr>
          </thead>
          <tbody>
            {filtereredData.map((student) => (
              <tr key={student.rollNumber}>
                <td className="border p-2">{student.rollNumber}</td>
                <td className="border p-2">{student.fullName}</td>
                <td className="border p-2">{student.totalScore==0 ? "Not Assigned Yet" : student.totalScore}</td>
                <td className="border p-2">
                  {student.criteriaScores.map((score, index) => (
                    <span key={index} className=" mr-1 sm:mr-2 font-bold">
                          {Criteria[index]}: {score}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       </div>
      
      </>
   
  );
};

export default ViewStudentsPage;
