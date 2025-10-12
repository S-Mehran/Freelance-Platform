import nodemailer from "nodemailer"
import * as dotenv from "dotenv"

dotenv.config()


const {MT_USER, MT_PASS} = process.env

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: MT_USER,
    pass: MT_PASS
  }
});

transport.verify((error, success) => {
  if (error) console.error(error);
  else console.log('Mailtrap connection successful!');
});



export const mailService = {
  async sendOtpMail(email: string, otp:string) {
    await transport.sendMail({
      from: '"App Support" <support@app.com>',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`,
    })
  }
}

