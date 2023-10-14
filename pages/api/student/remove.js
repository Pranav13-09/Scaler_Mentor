
import connectDB from "../../../utils/connectDB";
import Student from "../../../models/studentModel"
import Mentor from "@/models/mentorModel";


const user = async (req, res) => {
  switch (req.method) {
   
      case "POST": 
          
          const { mentorId, rollNumber } = req.body.data;
          console.log(mentorId,rollNumber,"i am body part")

          console.log(req.body,"i am body")
          try {
              
        const mentor = await Mentor.findById(mentorId);
          if (!mentor) {
              return res.status(400).json({message : "Mentor not found"})
          }

          const currStudent = await Student.findOne({ roll_no: parseInt(rollNumber) });
          if (!currStudent) {
              return res.status(400).json({message : "Student not found"})
          }


            currStudent.mentor_id = null;
            currStudent.pitch_score = null;
            currStudent.idea_score = null;
            currStudent.research_score = null;
            currStudent.execution_score = null;
            currStudent.market_score = null;
            currStudent.total_score = 0;
          await currStudent.save();

         return res.status(200).json({message : "Student removed Successfully"})
              
          } catch (err) {
              console.log(err);
              return res.status(500).json({message : "Internal Server Error"})
           }
    
          
   
    
        
      break;
  }
};

export default connectDB(user);
