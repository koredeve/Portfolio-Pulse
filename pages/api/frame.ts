// pages/api/frame.ts
import { createFrames, Button } from 'frames.js/next';
import type { NextRequest } from 'next/server';

const frames = createFrames();

export const GET = frames(async (ctx) => {
  const address = ctx.message?.requester?.address;

  // Default button: Connect Wallet
  const connectButton: Button.Link = {
    label: 'Connect Wallet',
    action: 'link',
    target: `${process.env.PUBLIC_URL}/siwf`,
  };

  let image = 'https://quickchart.io/chart?c={type:"doughnut",data:{labels:["Portfolio"],datasets:[{data:[100]}]}}';
  let description = 'Connect your wallet to see your portfolio pulse!';
  const buttons: Button[] = [connectButton];

  if (address) {
    const totalValue = await fetchPortfolioValue(address);
    image = `${process.env.PUBLIC_URL}/api/image?value=${totalValue}`;
    description = `Your portfolio: $${totalValue.toFixed(2)} USD. Level: ${getLevel(totalValue)}`;

    // Add Share button only if connected
    const shareButton: Button.Post = {
      label: 'Share Pulse',
      action: 'post',
    };
    buttons.push(shareButton);
  }

  return {
    image,
    description,
    buttons,
  };
});

export const POST = GET;

// MOCK DATA — Replace with Zerion later
async<|eos|>