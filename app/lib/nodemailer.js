const nodemailer = require("nodemailer");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('secretkey');

const baseUrl = 'http://localhost:3002'
  
  let mailOptions = {};

  let generateMailOptions = (type, email) => {
    let output = generateOutputMsg(type, email);
    let subject = generateSubject(type);
    mailOptions = {
    from: '"TODOL App" <admin@mplanner.com>', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: "If you are unable to read this mail. Please reply us to this email address.", // plain text body
    html: output // html body
    }
  };

  let sendmail = (callback) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'greyson.runolfsdottir12@ethereal.email',
          pass: 'n57FNjNhWuENZZuTas'
      }
  });
  

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if(error){
        console.log(error);
        callback(false);
      }
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      callback(true);
    });
  }

  let cryptData = (data) => cryptr.encrypt(data);

  let generateOutputMsg = (type, email) => {
    if(type === 'forgotPassword'){
    return `<p>Dear Madam/Sir,</p>

            <p>We have received a request to reset password for user email (${email}). Please click on the provided link to reset your password.
            ${baseUrl}/resetpassword?for=${cryptData(email)}</p>
            
            <p>Thanks & regards </p>`;
    }
  }

  let generateSubject = (type) => {
    if(type === 'forgotPassword'){
      return `Password Reset Link`;
    }
  }

module.exports = {
  sendmail : sendmail,
  generateMailOptions : generateMailOptions
}
