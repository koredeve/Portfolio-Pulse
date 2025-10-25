// pages/api/frame.ts
import { createFrames, Button } from 'frames.js/next';

const frames = createFrames();

export const GET = frames(async (ctx) => {
  const address = ctx.message?.requesterVerifiedAddresses?.[0];

  if (address) {
    const totalValue = await fetchPortfolioValue(address);
    const image = `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/image?value=${totalValue}`;
    
    return {
      image,
      buttons: [
        <Button action="post">Share Pulse</Button>,
        <Button action="link" target={`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/siwf`}>
          Connect Wallet
        </Button>,
      ],
    };
  }

  return {
    image: 'https://quickchart.io/chart?c={type:"doughnut",data:{labels:["Portfolio"],datasets:[{data:[100]}]}}',
    buttons: [
      <Button action="link" target={`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/siwf`}>
        Connect Wallet
      </Button>,
    ],
  };
});

export const POST = frames(async (ctx) => {
  const address = ctx.message?.requesterVerifiedAddresses?.[0];
  
  if (!address) {
    return {
      image: 'https://quickchart.io/chart?c={type:"doughnut",data:{labels:["Portfolio"],datasets:[{data:[100]}]}}',
      buttons: [
        <Button action="link" target={`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/siwf`}>
          Connect Wallet
        </Button>,
      ],
    };
  }

  const totalValue = await fetchPortfolioValue(address);
  const image = `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/image?value=${totalValue}`;

  return {
    image,
    buttons: [
      <Button action="post">Refresh</Button>,
      <Button action="link" target={`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/siwf`}>
        Connect Wallet
      </Button>,
    ],
  };
});

async function fetchPortfolioValue(address: string): Promise<number> {
  return Math.floor(Math.random() * 15000) + 500;
}

function getLevel(value: number): string {
  return value > 10000 ? 'Whale' : value > 1000 ? 'Dolphin' : 'Shrimp';
}