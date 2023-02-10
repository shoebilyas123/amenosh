import nodemailer from 'nodemailer';
import { IEmailPayload } from '~/interfaces/email';
import { send, sendForm } from '@emailjs/browser';

export const sendEmail = async (params: IEmailPayload) => {
  const templateParams = {
    ...params,
    recipientName: 'Amenosh Test',
  };

  console.log(templateParams);
  return await send(
    process.env.EMAILJS_SERVICE_ID || '',
    process.env.EMAILJS_TEMPLATE_ID || '',
    templateParams,
    process.env.EMAILJS_PUBLIC_KEY || ''
  );
};
