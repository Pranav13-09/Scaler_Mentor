// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import transporter from "../../utils/mailUtil"
import connectDB from "../../utils/connectDB";
// import nodemailer from "nodemailer"



const user = async (req, res) => {
  try {

//     const transporter =  nodemailer.createTransport({
//         service: "Gmail",
//         auth: {
//           user: "morepranav51@gmail.com",
//           pass: "xrtnybwlloxnhwjm",
//         },
// });
      await transporter.sendMail({
        to: "pranavmoreca8@gmail.com",
        subject: "Verify Acoount",
        html: `Hello how are you ??`,
      });
    console.log("mail sent okk")
    res.status(200).json({ name: 'John Doe' })
  }
  catch (err) {
    console.log(err, "i am error");
    return res.status(400).json({message:"Error"})
  }
 
  
};

export default connectDB(user);

