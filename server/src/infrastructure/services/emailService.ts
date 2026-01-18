
import { IEmailService } from "../../applications/interfaces/services/IEmailService";
import {emailTemplate} from '../../shared/emailTemplate'

export class EmailService implements IEmailService {

private  transporter = nodemailer.createTransport({
  host:  "smtp.ethereal.email",
  port:Number(process.env.EMAIL_PORT),
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
 async sendOtp(email: string, otp: string): Promise<void> {
  console.log('from email servives',email,otp);
  
const info=await this.transporter.sendMail({
  from:`"HireNest" <${process.env.ADMIN_EMAIL}>`,
  to:email,
  subject:`Your OTP code`,
  html:emailTemplate(otp)
})
console.log('(nodemailer.getTestMessageUrl',nodemailer.getTestMessageUrl(info)
);

  }
}
import nodemailer from 'nodemailer'


