import React, { useState } from 'react';


const StudentMarksForm = ({ student, onUpdateMarks,isFinalized }) => {
  const [marks, setMarks] = useState({
    idea_score: student?.idea_score,
    pitch_score: student?.pitch_score,
    execution_score: student?.execution_score,
    research_score: student?.research_score,
    market_score: student?.market_score
  });

  const [isFinal, setIsFinal] = useState(isFinalized)
  console.log(isFinalized,"i am isFinalizes")

  const handleMarkChange = (criterion, value) => {

  const clampedValue = value === '' ? '' : Math.min(10, Math.max(0, value));
  
  setMarks(prevMarks => ({
    ...prevMarks,
    [criterion]: clampedValue
  }));
};

  const handleSubmit = async (event) => {
    event.preventDefault();
   await  onUpdateMarks(student.roll_no,marks)
      
   
  };

  return (
 <div className="mb-4 p-4 border rounded shadow-lg">
  <div className="flex justify-between mb-4">
    <div>
      <h2 className="text-lg font-bold">{`${student.first_name} ${student.last_name}`}</h2>
      <p className="text-gray-600">{`Roll Number: ${student.roll_no}`}</p>
        </div>
        {
          student.total_score!=0 && 
             <div className="text-lg font-bold">
              Total Marks: {student.total_score}
            </div>
        }
 
  </div>

  <form onSubmit={handleSubmit} className="space-y-4">
    {Object.keys(marks).map((criterion) => (
      <div key={criterion} className="flex items-center">
        <label className="w-1/4">{`${criterion.replace('_', ' ').toUpperCase()} (Max 10):`}</label>
        <input
          type="number"
          value={marks[criterion]}
          onChange={(e) => handleMarkChange(criterion, e.target.value)}
          className="p-2 border border-gray-300 rounded w-1/2"
          min="0"
          max="10"
          required={true}
        />
      </div>
    ))}

    {!isFinal && (
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Submit Marks
      </button>
    )}
  </form>
</div>

  );
};

export default StudentMarksForm
