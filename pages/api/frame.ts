// pages/api/frame.ts
import { createFrames } from 'frames.js/next';
import type { NextRequest } from 'next/server';

const frames = createFrames();

export const GET = frames(async (ctx) => {
  const address = ctx.message?.requester?.address;

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
      text: `My Portfolio Pulse: $${totalValue.toFixed(2)}! @portfolio-pulse`,
    });
  }

  return {
    image,
    description,
    buttons,
  };
});

export const POST = GET; // Reuse for button actions

// MOCK DATA — replace later with real Zerion
async function fetchPortfolioValue(address: string): Promise<number> {
  console.log("Wallet connected:", address);
  return Math.floor(Math.random() * 15000) + 500; // $500–$15,500
}

function getLevel(value: number): string {
  return value > 10000 ? 'Whale' : value > 1000 ? 'Dolphin' : 'Shrimp';
}