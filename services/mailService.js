import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // false for port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify connection when server starts
transporter.verify((error, success) => {
  if (error) {
    console.log("Mail Server Error:");
    console.log(error);
  } else {
    console.log("Mail Server Ready");
  }
});

export default transporter;