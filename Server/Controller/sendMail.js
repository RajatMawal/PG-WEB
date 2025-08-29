import nodemailer from "nodemailer";
import "dotenv/config";

<<<<<<< Updated upstream
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


=======
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
>>>>>>> Stashed changes
export const sendEmail = async (data) => {
  try {
    const mailOptions = {
      from: `"Pribhum Nest" <${process.env.HOSTINGER_EMAIL}>`,
      to: data.email,
<<<<<<< Updated upstream
      subject: "Pribhum Nest Password Reset",
      text: `Hello,

We received a request to reset the password for your Pribhum Nest account.

=======
      subject: "Pribhum Nest OTP Verification",
      text: `Hello,

>>>>>>> Stashed changes
Your One-Time Password (OTP) is: ${data.otp}

This OTP is valid for 2 minutes.

<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes
    throw error;
  }
};

<<<<<<< Updated upstream

export const verifyEmailOtp = async (data) => {
=======
export const verifyEmailOtp = async (data, next) => {
>>>>>>> Stashed changes
  try {
    const mailOptions = {
      from: `"Pribhum Nest" <${process.env.HOSTINGER_EMAIL}>`,
      to: data.email,
      subject: "Verify Your Email - Pribhum Nest",
<<<<<<< Updated upstream
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
=======
      text: `Your OTP is ${data.otp}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Mail Sent:", info);

    return { success: true, info };
  } catch (error) {
    console.error("❌ Error sending verification email:", error);
    if (next) return next(error);  // only call if available
    throw error;
>>>>>>> Stashed changes
  }
};
