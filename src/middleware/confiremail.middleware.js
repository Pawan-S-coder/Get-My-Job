import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// dotenv.config();

const sendMail = async(req,res,next)=>{
    const applicantEmail=req.body.email;
    const transporter= nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'codingninjas2k16@gmail.com',
            pass:'slwvvlczduktvhdj'
        }
     });
     const mailOptions={
        from:'codingninjas2k16@gmail.com',
        to:applicantEmail,
        subject:'job application',
        text:'your application has been submitted successfully',
      };
      try{
        const result= await transporter.sendMail(mailOptions);
        console.log('mail send successfully:', result);
        next();

      }catch(err){
        console.log('email send fail with error :'+ err.message);
        res.status(500).send('Failed to send email.');

      }
}
 export default sendMail;