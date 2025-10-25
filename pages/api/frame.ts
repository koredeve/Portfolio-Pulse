import { createFrames } from '@farcaster/frames-sdk';
import type { NextApiRequest, NextApiResponse } from 'next';

const frames = createFrames({
  apiKey: process.env.FRAME_SECRET ?? 'fallback-secret', // Use env var
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if user has connected wallet (from session/cookie — simplify for MVP)
  const address = req.headers['x-wallet-address'] as string || null; // In prod, use sessions

  let imageUrl = `${process.env.PUBLIC_URL}/api/static-image.png`; // Default
  let description = 'Connect your wallet to see your portfolio pulse!';
  let buttons = [
    {
      label: 'Connect Wallet',
      action: 'link',
      target: `${process.env.PUBLIC_URL}/siwf`,
    },
  ];

  if (address) {
    // Fetch portfolio summary
    const totalValue = await fetchPortfolioValue(address);
    imageUrl = `${process.env.PUBLIC_URL}/api/image?value=${totalValue}&address=${address}`;
    description = `Your portfolio: $${totalValue.toFixed(2)} USD. Level: ${getLevel(totalValue)}`;
    buttons.push({
      label: 'Share Pulse',
      action: 'post',
      target: `farcaster://cast?text=My Portfolio Pulse: $${totalValue.toFixed(2)}! What's yours? @portfolio-pulse`,
    });
  }

  const frame = await frames.render({
    version: 'vNext',
    title: 'Portfolio Pulse',
    image: imageUrl,
    description,
    buttons,
  });

  res.status(200).json(frame);
}

// Mock helper — replace with real API in utils
async function fetchPortfolioValue(address: string): Promise<number> {
  try {
    const { data } = await fetch(`https://api.zerion.io/v1/wallets/${address}/positions?chain=base`, {
      headers: { Authorization: `Bearer ${process.env.ZERION_API_KEY}` },
    }).then(r => r.json());
    return data.positions.reduce((sum: number, pos: any) => sum + (pos.value?.usd || 0), 0);
  } catch {
    return 0; // Fallback for empty wallet
  }
}

function getLevel(value: number): string {
  return value > 10000 ? 'Whale' : value > 1000 ? 'Dolphin' : 'Shrimp';
}