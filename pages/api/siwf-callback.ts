import { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { message, signature, nonce } = req.body;
  if (!message || !signature || nonce !== req.query.nonce) {
    return res.status(400).json({ error: 'Invalid SIWF' });
  }

  try {
    const payload = JSON.parse(message);
    const recoveredAddress = ethers.verifyMessage(message, signature);
    if (recoveredAddress.toLowerCase() === payload.address?.toLowerCase()) {
      // Store in cookie/session for Frame (MVP: redirect with header)
      res.setHeader('Set-Cookie', `wallet=${recoveredAddress}; Path=/; HttpOnly`);
      res.redirect(302, `${process.env.PUBLIC_URL}/api/frame?address=${recoveredAddress}`);
    } else {
      res.status(401).json({ error: 'Signature mismatch' });
    }
  } catch (e) {
    res.status(500).json({ error: 'Verification failed' });
  }
}