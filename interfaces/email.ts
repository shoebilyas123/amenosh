export interface IEmailPayload {
  firstName: string;
  lastName: string;
  message: string;
  email: string;
  phoneNumber: string;
  city: string;
  address: string;
  postalCode: string;
  usertype: string;
  usertypecustom: string;
}

export interface ISendEmailParam {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}
