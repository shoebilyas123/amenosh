import { NextRequest, NextResponse } from 'next/server';

export default async function handler(req: NextRequest, res: NextResponse) {
  if (req.method === 'POST') {
    return await sendContactEmail(req, res);
  }
}

const sendContactEmail = async (req: NextRequest, res: NextResponse) => {};
