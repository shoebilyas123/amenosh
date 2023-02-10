export interface IEmailPayload {
  firstName: string;
  lastName: string;
  message: string;
  email: string;
}

export interface ISendEmailParam {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}
