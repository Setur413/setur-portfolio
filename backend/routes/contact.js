const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/", (req, res) => {
  const { fname, email, no, subj, message } = req.body;

  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // your inbox
    subject: subj,
    text: `
      Name: ${fname}
      Email: ${email}
      Phone: ${no}

      Message:
      ${message}
    `
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Failed to send message"
      });
    }
    res.json({
      success: true,
      message: "Message sent successfully!"
    });
  });
});

// 👇 Critical: export router
module.exports = router;
