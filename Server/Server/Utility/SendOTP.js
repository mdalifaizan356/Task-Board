const nodemailer = require("nodemailer");
// const { genertaeOtp } = require("../Utility/otpGen");

const transporter = nodemailer.createTransport(
    {
        secure:true,
        host:'smtp.gmail.com',
        port:465,
        auth:{
            user:'venomouspasha@gmail.com',
            pass:'qdzhcahzmvfgfzzd'
        }
    }
)

exports.sendMail=(to, sub, msg)=>{
    transporter.sendMail({
        to:to,
        subject:sub,
        html:msg
    });
    console.log("Email Sent");
}
