
import connectDB from "../../../utils/connectDB";
import Student from "../../../models/studentModel"


const user = async (req, res) => {
  switch (req.method) {
   
      case "GET": 
     
          const { rollNumber ,mentorId} = req.query
          
          
          console.log(rollNumber,"i am rollNumber")
   
      try {
        const student = await Student.findOne({ roll_no: rollNumber })
        if (!student) {
          return res.status(400).json({message:"Student with given roll number does not exist"})
        }

        if (student.mentor_id) {
          console.log("I am here in mentor id")
          return res.status(400).json({message:"Student is already assigned to other mentor"})
        }

        student.mentor_id = mentorId;
        await student.save()

        return res.status(200).json(student)
      
      } catch (err) {
        console.log(err, "i am the error okk");
        return res.status(500).json({message : "Internal Server Error"})
      }
        
      break;
  }
};

export default connectDB(user);
