
import connectDB from "../../../utils/connectDB";
import Student from "../../../models/studentModel"
import Mentor from "@/models/mentorModel";


const user = async (req, res) => {
  switch (req.method) {
   
      case "GET": 

          const { mentorId } = req.query

          try {
          
              const mentor = await Mentor.findById(mentorId);

              if (!mentor) {
                  return res.status(400).json({message : "Mentor not found"})
              }
              
        const student = await Student.find({ mentor_id: mentorId }).select('-_id -mentor_id');
        return res.status(200).json({student :student,isFinalized : mentor. isGroupFinalized, isGrouped : mentor.isGroupCreated})
      
      } catch (err) {
        console.log(err, "i am the error okk");
        return res.status(500).json({message : "Internal Server Error"})
      }
        
      break;
  }
};

export default connectDB(user);
