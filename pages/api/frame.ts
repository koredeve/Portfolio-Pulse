// pages/api/frame.ts
import { createFrames } from 'frames.js/next';
import type { NextRequest } from 'next/server';

const frames = createFrames();

export const GET = frames(async (ctx) => {
  // FIXED: requester → requesterFid
  const address = ctx.message?.requesterFid ? '0x...' : undefined;

  let image = 'https://quickchart.io/chart?c={type:"doughnut",data:{labels:["Portfolio"],datasets:[{data:[100]}]}}';
  let description = 'Connect your wallet to see your portfolio pulse!';
  const buttons = [
    {
      label: 'Connect Wallet',
      action: 'link',
      target: `${process.env.PUBLIC_URL}/siwf`,
    },
  ];

  if (address) {
    const totalValue = await fetchPortfolioValue(address);
    image = `${process.env.PUBLIC_URL}/api/image?value=${totalValue}`;
    description = `Your portfolio: $${totalValue.toFixed(2)} USD. Level: ${getLevel(totalValue)}`;
    buttons.push({
      label: 'Share Pulse',
      action: 'post',
    });
  }

  return {
    image,
    description,
    buttons: buttons as any,
  };
});

export const POST = GET;

async function fetchPortfolioValue(address: string): Promise<number> {
  return Math.floor(Math.random() * 15000) + 500;
}

function getLevel(value: number): string {
  return value > 10000 ? 'Whale' : value > 1000 ? 'Dolphin' : 'Shrimp';
}