
import connectDB from "../../../utils/connectDB";
import Student from "../../../models/studentModel"


const user = async (req, res) => {
  switch (req.method) {
   
      case "GET": 
    
   
      try {
        const allStudents = await Student.find();
        return res.status(200).json(allStudents)
      } catch (err) {
        console.log(err, "i am the error okk");
        return res.status(500).json({message : "Internal Server Error"})
      }
        
      break;
  }
};

export default connectDB(user);
