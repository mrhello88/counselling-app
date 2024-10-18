const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  port: 465,
  auth: {
    user: process.env.EMAIL, // This is the literal string 'apikey', not your SendGrid username
    pass: process.env.G_PASS, // Your SendGrid API key
  },
});

const sendMail = (email, token) => {
  transporter.sendMail({
    from: process.env.EMAIL, // Correct 'from' email
    to: email,
    subject: `${
      token === "student"
        ? "You Bought the Course"
        : token === "counselor"
        ? "A Student Bought a Course of Yours"
        : "Verify Your Email Address"
    }`,
    html: `
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
          <td>
            <table width="600px" cellpadding="0" cellspacing="0" border="0" align="center" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <tr>
                <td style="background-color: #5cb85c; padding: 20px; text-align: center; color: #ffffff;">
                  <h1 style="margin: 0; font-size: 24px;">${
                    token === "student"
                      ? "Course Purchase Confirmation"
                      : token === "counselor"
                      ? "Course Purchase Notification"
                      : "Verify Your Email"
                  }</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px;">
                  <p style="font-size: 16px; color: #333333; margin-bottom: 20px;">Hello,</p>
                  ${
                    token === "student"
                      ? `<p style="font-size: 16px; color: #333333; margin-bottom: 20px;">Thank you for purchasing the course! You can access your course anytime by logging into your account.</p>`
                      : token === "counselor"
                      ? `<p style="font-size: 16px; color: #333333; margin-bottom: 20px;">A student has just purchased one of your courses! You can view the details in your dashboard.</p>`
                      : `<p style="font-size: 16px; color: #333333; margin-bottom: 20px;">Please verify your email address by clicking the link below:</p>`
                  }
                  ${
                    token === "student" || token === "counselor"
                      ? ""
                      : `<p style="text-align: center; margin: 40px 0;">
                          <a
                            href="http://localhost:5173/register/verify/${token}"
                            style="display: inline-block; padding: 10px 20px; background-color: #5cb85c; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px;"
                          >
                            Verify Email
                          </a>
                        </p>`
                  }
                  <p style="font-size: 14px; color: #999999;">If you didn't request this, please ignore this email.</p>
                </td>
              </tr>
              <tr>
                <td style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #999999;">
                  © 2024 Your Company. All rights reserved.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  `,
  });
};

module.exports = sendMail;
