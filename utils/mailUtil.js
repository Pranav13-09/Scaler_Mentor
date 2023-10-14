import nodemailer from 'nodemailer';

const transporter =  nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
});
      

export default transporter