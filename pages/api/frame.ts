// pages/api/frame.ts
import { createFrames, Button } from 'frames.js/next';
import type { NextRequest } from 'next/server';

const frames = createFrames();

export const GET = frames(async (ctx) => {
  const address = ctx.message?.requester?.address;

  let image = 'https://quickchart.io/chart?c={type:"doughnut",data:{labels:["Portfolio"],datasets:[{data:[100]}]}}';
  let description = 'Connect your wallet to see your portfolio pulse!';
  
  let buttons = [
    Button.link(
      'Connect Wallet', 
      `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/siwf`
    ),
  ];

  if (address) {
    const totalValue = await fetchPortfolioValue(address);
    image = `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/image?value=${totalValue}`;
    description = `Your portfolio: $${totalValue.toFixed(2)} USD. Level: ${getLevel(totalValue)}`;
    
    // Create new buttons array with both buttons
    buttons = [
      Button.action('Share Pulse', 'post'),
      Button.link(
        'Connect Wallet', 
        `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/siwf`
      ),
    ];
  }

  return {
    image,
    description,
    buttons,
  };
});

export const POST = frames(async (ctx) => {
  const address = ctx.message?.requester?.address;
  
  if (!address) {
    return {
      image: 'https://quickchart.io/chart?c={type:"doughnut",data:{labels:["Portfolio"],datasets:[{data:[100]}]}}',
      description: 'Please connect your wallet first!',
      buttons: [
        Button.link(
          'Connect Wallet', 
          `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/siwf`
        ),
      ],
    };
  }

  const totalValue = await fetchPortfolioValue(address);
  const image = `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/image?value=${totalValue}`;
  const description = `Shared Portfolio: $${totalValue.toFixed(2)} USD. Level: ${getLevel(totalValue)}`;

  return {
    image,
    description,
    buttons: [
      Button.action('Refresh', 'post'),
      Button.link(
        'Connect Wallet', 
        `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/siwf`
      ),
    ],
  };
});

async function fetchPortfolioValue(address: string): Promise<number> {
  console.log("Wallet:", address);
  return Math.floor(Math.random() * 15000) + 500;
}

function getLevel(value: number): string {
  return value > 10000 ? 'Whale' : value > 1000 ? 'Dolphin' : 'Shrimp';
}