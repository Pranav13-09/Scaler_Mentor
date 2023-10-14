
import connectDB from "../../../utils/connectDB";
import Student from "../../../models/studentModel"
import Mentor from "@/models/mentorModel";


const user = async (req, res) => {
  switch (req.method) {
   
      case "POST": 
    
          const { mentorId ,marks,rollNumber} = req.body
      const { pitch_score, execution_score, market_score, research_score, idea_score } = marks;
      const totalMarks = pitch_score + execution_score + market_score + research_score + idea_score;

      console.log(mentorId,marks,rollNumber,"i am the data you want")
          try {
          
              const mentor = await Mentor.findById(mentorId);

              if (!mentor) {
                  return res.status(400).json({message : "Mentor not found"})
              }

            const student = await Student.findOneAndUpdate(
        { roll_no: rollNumber },
        {
          $set: {
            pitch_score: pitch_score,
            execution_score: execution_score,
            idea_score: idea_score,
            research_score: research_score,
            market_score: market_score,
            total_score : totalMarks
          },
        },
        { new: true }
      );

      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

    return  res.status(200).json({ message: 'Student marks updated successfully', student });
              
      
      
      } catch (err) {
        console.log(err, "i am the error okk");
        return res.status(500).json({message : "Internal Server Error"})
      }
        
      break;
  }
};

export default connectDB(user);
