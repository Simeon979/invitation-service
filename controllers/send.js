var nodemailer = require('nodemailer');
const EmailValidator = require('email-deep-validator');
const emailValidator = new EmailValidator();
const verifyMail = async (user_email_address) =>{
    let mail_status = false
    const {wellFormed, validDomain, validMailbox} = await emailValidator.verify(user_email_address);
    if (wellFormed || validDomain || validMailbox) {
        // console.log('Well- formed email recieved');
        mail_status = true
    }
    return mail_status;
}

const sendHandler = async (req,res) => {
    // console.log(req.body.email);
    await verifyMail(req.body.email)
    .then((stat) =>{
        if (stat == true) {
            res.status(200).send(
                {
                    "message": `We sent a one use code to ${req.body.email}`
                  })
        }else{
            res.status(401).send(
                {
                    "message": `Invalid Email`})
        }
    }
        
        
    )
}
module.exports = sendHandler