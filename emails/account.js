const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "artstoreunicode@outlook.com",
    pass: process.env.EMAIL_PASSWORD
  }
})

const sendWelcomeEmail = (email, name) => transporter.sendMail({
  from: "artstoreunicode@outlook.com",
  to: email,
  subject: "Welcome to Art Store",
  text: `Thanks for joining us, ${name} `
}, (err, info) => {
  if(err){
    return console.log(err)
  }
  console.log("Message sent: %s", info.messageId);
})

const sendCancellationEmail = (email, name) => transporter.sendMail({
    from: "artstoreunicode@outlook.com",
    to: email,
    subject: "Sorry to see you go!",
    text: `We are sorry to see you leave us as a customer, ${name}. We hope to better our service and hope you join us again! `
  }, (err, info) => {
    if(err){
      return console.log(err)
    }
    console.log("Message sent: %s", info.messageId)
})

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail
}
