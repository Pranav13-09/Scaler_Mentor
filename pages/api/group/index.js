
import connectDB from "../../../utils/connectDB";
import Mentor from "../../../models/mentorModel"
import Student from "../../../models/studentModel"


const user = async (req, res) => {
  switch (req.method) {
      case "POST":
          const { mentorId } = req.body
        
      try {
        const mentor = await Mentor.findById(mentorId);
        console.log("i am in create grop okk")

        if (!mentor) {
          return res.status(400).json({ message: "Mentor does not exist"});
        }

        const students = await Student.find({ mentor_id: mentorId });
        if (students.length < 3) {
          return res.status(400).json({message: "Minmum 3 students are required to create the group",success: false})
        }

        if (students.length > 4) {
             return res.status(400).json({message: "Maximum 4 students are can be present in one group",success: false})
        }

        mentor.isGroupCreated = true;
        await mentor.save();

        return res.status(200).json({message : "Group created Successfully",success:true})

      
 
    } catch (error) {
      res.status(400).json({ success: false, error: 'Invalid data provided' });
          }
          
    
      break;
  }
};

export default connectDB(user);
