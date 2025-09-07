import nodemailer from "nodemailer";
import "dotenv/config";

// 1️⃣ Create transporter
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,           // SSL port
  secure: true,        // must be true for 465
  auth: {
    user: process.env.HOSTINGER_EMAIL,
    pass: process.env.HOSTINGER_PASS
  },
  logger: true,        // log SMTP activity
  debug: true          // show debug info
});

// 2️⃣ Verify SMTP connection
transporter.verify((err, success) => {
  if (err) {
    console.error("SMTP connection failed:", err);
  } else {
    console.log("SMTP ready to send messages:", success);
  }
});

// 3️⃣ Send OTP email
export const sendEmail = async (data) => {
  try {
    const mailOptions = {
      from: `"Pribhum Nest" <${process.env.HOSTINGER_EMAIL}>`,
      to: data.email,
      subject: "Pribhum Nest OTP Verification",
      text: `Hello,

Your One-Time Password (OTP) is: ${data.otp}

This OTP is valid for 2 minutes.

If you did not request this, ignore this email.

Thank you,
Pribhum Nest Team`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully:", info.messageId);
    console.log("Response:", info.response);
    return info;

  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error;
  }
};

// 4️⃣ Optional: Verification email
export const verifyEmailOtp = async (data) => {
  try {
    const mailOptions = {
      from: `"Pribhum Nest" <${process.env.HOSTINGER_EMAIL}>`,
      to: data.email,
      subject: "Verify Your Email - Pribhum Nest",
      text: `Hello,

To complete your registration, please use the OTP below:

OTP: ${data.otp}

This code will expire in 2 minutes.

If you did not request this, ignore this email.

Best regards,
Pribhum Nest Team`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent:", info.messageId);
    console.log("Response:", info.response);
    return info;

  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};
