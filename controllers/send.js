// requires
const express = require('express');
const cors = require("cors");
// const mailer = require("./services/mail") // send email
const app = express();
const bodyparser = require('body-parser');
// // middlewares
app.use(cors());
app.use(express.json());
app.use(bodyparser.json())
app.use((err, req, res, next) =>
  res.status(500).json({
    message: "an error occured while processing your request",
  })
);
var nodemailer = require('nodemailer');
const EmailValidator = require('email-deep-validator');
const emailValidator = new EmailValidator();


// verifyMail, returns if the user_email_address is valid and email can enter
// @param :: user_email_address
// @return :: mail_status
const verifyMail = async (user_email_address) =>{
    let mail_status = false
    const {wellFormed, validDomain, validMailbox} = await emailValidator.verify(user_email_address);
    if (wellFormed && validDomain && validMailbox) {
        // console.log('Well- formed email recieved');
        mail_status = true
    }
    return mail_status;
}


const send = async (token) => {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: '',
          pass: '',
        }
      });
      
      var mailOptions = {
        from: '',
        to: '',
        subject: `New Invitation token`,
        text: `Your invitation token is \n ${token}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
};

const sendHandler = async (req, res) => {
    // console.log(req,res);
    // res.status(200).send(req.query._mail)

    // just create a function sendHandler in controllers/send.js, accept the request,
    //  process it (using functions in the services folder that will be completed later),
    //   and set up the response. and then export the function

let stat = false;
    await verifyMail(req.params._mail)
    .then(status => {
        console.log(status);
        res.status(200).send(status)
    }
        )
    .catch(err => console.log(err)
    )
    // ).then(st => console.log(st))
    // .catch(er => console.log(er)
    // )
}

// module.exports = { send, verifyMail };
module.exports = sendHandler


