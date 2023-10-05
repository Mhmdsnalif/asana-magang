import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../users/User.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendForgotPasswordEmail(email: string, token: string) {
    const subject = 'Reset Password';
    const resetLink = `https://your-app.com/reset-password?token=${token}`;

    const html = `
      <p>Hello</p>
      <p>You have requested to reset your password. Please click the link below to reset it:</p>
      <p><a href='${resetLink}'>Reset Password</a></p>
      <p>If you did not request this, please ignore this email.</p>
    `;

    await this.mailerService.sendMail({
      to: email,
      subject,
      html,
    });
  }
}
