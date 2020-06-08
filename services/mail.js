<<<<<<< HEAD
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const OAuth2 = google.auth.OAuth2;

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const refreshToken = process.env.REFRESH_TOKEN;

const oauth2Client = new OAuth2(
  clientId,
  clientSecret,
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: refreshToken,
});

const send = async (message, email) => {
  const accessToken = await oauth2Client.getAccessToken();

  let sender = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      type: "OAuth2",
      user: "hngteamsilver@gmail.com",
      clientId,
      clientSecret,
      accessToken: accessToken.token,
      refreshToken,
    },
  });

  let response = await sender.sendMail({
    from: "'Team Silver' <hngteamsilver@gmail.com>",
    subject: "Invitation to Team Silver",
    to: email,
    text: message,
  });

  console.log(response);
};
=======
>>>>>>> a5ce4fd... First commits

// var nodemailer = require('nodemailer');
// const EmailValidator = require('email-deep-validator');
// const emailValidator = new EmailValidator();


// // verifyMail, returns if the user_email_address is valid and email can enter
// // @param :: user_email_address
// // @return :: mail_status
// const verifyMail = async (user_email_address) =>{
//     let mail_status = false
//     const {wellFormed, validDomain, validMailbox} = await emailValidator.verify(user_email_address);
//     if (wellFormed && validDomain && validMailbox) {
//         // console.log('Well- formed email recieved');
//         mail_status = true
//     }
//     return mail_status;
// }


// const send = async (message) => {
//     var transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//           user: 'fawaletimmy@gmail.com',
//           pass: 'kunle21121996',
//         }
//       });
      
//       var mailOptions = {
//         from: 'fawaletimmy@gmail.com',
//         to: 'fawaletimmy1@gmail.com',
//         subject: `Sending Email using Node.js:: \n ${message}`,
//         text: 'That was easy!'
//       };
      
//       transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//           console.log(error);
//         } else {
//           console.log('Email sent: ' + info.response);
//         }
//       });
// };



// module.exports = { send, verifyMail };
