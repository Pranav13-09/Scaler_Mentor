
import connectDB from "../../../utils/connectDB";
import Student from "../../../models/studentModel"
import Mentor from "@/models/mentorModel";
import transporter from "@/utils/mailUtil";


const user = async (req, res) => {
  switch (req.method) {
   
      case "POST": 
      
      const { mentorId} = req.body
      console.log("I am in the finalized Section")

          try {
          
            const mentor = await Mentor.findById(mentorId);
            console.log(mentor,"i am mentor")

              if (!mentor) {
                  return res.status(400).json({message : "Mentor not found"})
              }

            mentor.isGroupFinalized= true;
            await mentor.save();
            
            const students = await Student.find({ mentor_id: mentorId });
            console.log(students, "i am students")
            const emailPromises = students.map(sendEmailToStudent);
            const results = await Promise.allSettled(emailPromises);

            results.forEach((result) => {
              if (result.status === 'fulfilled') {
                console.log(`Email sent to ${result.value.student.email} successfully.`);
              } else {
                console.error(`Failed to send email to ${result.reason.student.email}: ${result.reason.error}`);
              }
            });

             return  res.status(200).json({ message: 'Marks Locked' ,success: true});
 
      } catch (err) {
        console.log(err, "i am the error okk");
        return res.status(500).json({message : "Internal Server Error",success : false})
      }
        
      break;
  }
};

const sendEmailToStudent = async (student) => {
  const { email, first_name,last_name,total_score,pitch_score,market_score,research_score,execution_score,idea_score } = student; // Adjust the property names based on your Student model

  const mailOptions = {
    from: 'morepranav51@gmail.com',
    to: email,
    subject: 'Final Evaluation Scores',
    text: `Hello ${first_name} ${last_name},\n\nYour evaluation scores are as follows:\n
    Total Score: ${total_score}\n
    Pitch Score: ${pitch_score}\n
    Market Score: ${market_score}\n
    Research Score: ${research_score}\n
    Execution Score: ${execution_score}\n
    Idea Score: ${idea_score}`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { student, success: true, info };
  } catch (error) {
    return { student, success: false, error: error.message };
  }
};

export default connectDB(user);
