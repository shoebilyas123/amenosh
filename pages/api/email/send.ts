import { NextApiRequest, NextApiResponse } from 'next';
import { sendClientMessage } from '~/lib/email';

export default async function (req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const { firstName, lastName, message, email } = req.body;

    await sendClientMessage({ email, firstName, message, lastName });

    res.json({ message: 'success' });
  } catch (err) {
    res.json({ message: 'Something went wrong' });
  }
}
