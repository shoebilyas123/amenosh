import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;
  const { email, captcha } = body;

  if (method !== 'POST') {
    return res.status(404).json({ error: 'Method not allowed' });
  }

  if (!email || !captcha) {
    return res.status(422).json({
      message: 'Unproccesable request, please provide the required fields',
    });
  }

  try {
    // Ping the google recaptcha verify API to verify the captcha code you received
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        method: 'POST',
      }
    );
    const captchaValidation = await response.json();

    if (captchaValidation.success) {
      return res.status(200).send('OK');
    }

    return res.status(422).json({
      message: 'Unproccesable request, Invalid captcha code',
    });
  } catch (error) {
    return res.status(422).json({ message: 'Something went wrong' });
  }
}
