import ResetToken from "../models/passwordResetToken.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const sendResetToken = async (frgtEml, user, isToken) => {
  try {
    let resetToken;
    const randomString = Math.random().toString(36).substring(2, 12); // Generate a random string for token
    const salt = await bcrypt.genSalt(10); // Use appropriate salt rounds
    const token = await bcrypt.hash(randomString, salt); // Hash the random string
    const shortToken = token.substring(0, 10);

    if (isToken) {
      resetToken = await ResetToken.findOneAndUpdate(
        { email: frgtEml },
        { token: shortToken, time: new Date() }
      );
    } else {
      resetToken = await ResetToken.create({
        email: user.email,
        token: shortToken,
        time: new Date(),
      });
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.FromEmailUser,
        pass: process.env.FromEmailPassword, // Use a secure way to store passwords
      },
    });

    let mailOptions = {
      from: process.env.FromEmailUser,
      to: user.email,
      subject: "Password Reset",
      text: "Want to Reset Password",
      html: `<p>Here is the link, <a href=https://proshop-front.onrender.com/forget-password?email=${user.email}&token=${shortToken}>click to change</a></p>`,
    };

    await transporter.sendMail(mailOptions);
    // console.log("Reset token sent successfully");
    return 200; // Indicate success
  } catch (error) {
    // console.error("Error sending reset token:", error);
    return error; // Indicate failure
  }
};
