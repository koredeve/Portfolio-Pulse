// pages/api/frame.ts
import { createFrames } from 'frames.js/next';

const frames = createFrames();

export const GET = frames(async () => {
  return {
    image: 'https://quickchart.io/chart?c={type:"doughnut",data:{labels:["Portfolio"],datasets:[{data:[100]}]}}',
    description: 'Connect your wallet to see your portfolio pulse!',
    buttons: [
      {
        label: 'Connect Wallet',
        action: 'link',
        target: `${process.env.PUBLIC_URL}/siwf`,
      } as const,
    ],
  };
});

export const POST = GET;