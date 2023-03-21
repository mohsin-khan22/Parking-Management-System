const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
const smtpAuth = require("../config").smtpAuth;

const sendEmail = (mailDetails) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: smtpAuth,
  });
  // Open template file
  var source = fs.readFileSync(
    path.join(__dirname, "../templates/email.hbs"),
    "utf8"
  );
  // Create email generator
  var template = Handlebars.compile(source);
  transporter.sendMail(
    { ...mailDetails, html: template(mailDetails.templateObj) },
    function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent", info);
      }
    }
  );
};

const sendEmailVerificationOTP = async (user) => {
  sendEmail({
    from: "Self assessment<stiching@info.pk>",
    to: user.email,
    subject: "Email Verification",
    templateObj: {
      name: user.name,
      otp: user.otp,
      email: user.email,
      emailText: `<p>Please verify that your email address is ${user.email} and that you entered it when signing up for Self Assessment.</p>
			<p>Enter this OTP to complete the Signup.</p>`,
    },
  });
};

module.exports = {
  sendEmailVerificationOTP,
};
