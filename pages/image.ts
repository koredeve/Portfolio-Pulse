import { NextApiRequest, NextApiResponse } from 'next';
import { createCanvas, loadImage } from 'canvas'; // npm install canvas node-canvas — but for Vercel, use a lib like @napi-rs/canvas or QuickChart for simplicity

// For MVP, use QuickChart.io (no local rendering needed)
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { value = 0 } = req.query;
  const chartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(`{
    type: 'doughnut',
    data: {
      labels: ['Portfolio', 'Cash'],
      datasets: [{ data: [${value}, 10000] }]
    },
    options: { title: { display: true, text: 'Your Pulse: $${value.toFixed(2)}' } }
  }`)}`;

  res.redirect(307, chartUrl); // Redirect to generated chart image
}