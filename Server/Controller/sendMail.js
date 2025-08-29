import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com", 
  port: 465,                   
  secure: true,
  auth: {
    user: process.env.HOSTINGER_EMAIL,
    pass: process.env.HOSTINGER_PASS,  
  },
  logger: true,  
  debug: true    
});


export const sendEmail = async (data) => {
  try {
    const mailOptions = {
      from: `"Pribhum Nest" <${process.env.HOSTINGER_EMAIL}>`,
      to: data.email,
      subject: "Pribhum Nest Password Reset",
      text: `Hello,

We received a request to reset the password for your Pribhum Nest account.

Your One-Time Password (OTP) is: ${data.otp}

This OTP is valid for 2 minutes.

If you did not request this password reset, please ignore this email.

Thank you,
The Pribhum Nest Team
© 2025 Pribhumnest. All rights reserved.`,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent:", result.messageId);
    return result;
  } catch (error) {
    console.error(" Error sending password reset email:", error);
    throw error;
  }
};


export const verifyEmailOtp = async (data) => {
  try {
    const mailOptions = {
      from: `"Pribhum Nest" <${process.env.HOSTINGER_EMAIL}>`,
      to: data.email,
      subject: "Verify Your Email - Pribhum Nest",
      text: `Hello,

Thank you for registering with Pribhum Nest!  

To complete your registration, please use the One-Time Password (OTP) below:

OTP: ${data.otp}

This code will expire in 2 minutes.  
If you did not request this, please ignore this email.

Best regards,  
The Pribhum Nest Team
© 2025 Pribhumnest. All rights reserved.`,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Verification email sent:", result.messageId);
    return result;
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error
  }
};
