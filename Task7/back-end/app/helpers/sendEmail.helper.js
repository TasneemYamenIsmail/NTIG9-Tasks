const nodemailer = require('nodemailer');

const stmpConfig ={
    service: 'gmail',
    auth:{ user:"marwaradwan666@gmail.com", pass:"123@Techs" }
}
const sendActivationEmail = (reciverEmail, textEmail)=>{
    try{
        const transporter = nodemailer.createTransport(stmpConfig)
        let mailOptions = {
            from:"Our E-Learning App",
            to:reciverEmail,
            subject:"Activate your account",
            text:textEmail
        }
        transporter.sendMail(mailOptions)
    }
    catch(e){
    }
    
}

module.exports = sendActivationEmail