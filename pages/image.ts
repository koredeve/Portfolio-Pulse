// pages/api/image.ts
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  const url = new URL(req.url);
  const value = url.searchParams.get('value') || '0';
  const chartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(`
    {
      type: 'doughnut',
      data: {
        labels: ['Portfolio', 'Goal'],
        datasets: [{
          data: [${value}, 10000],
          backgroundColor: ['#8b5cf6', '#e2e8f0']
        }]
      },
      options: {
        plugins: {
          title: { display: true, text: 'Your Pulse: $${value}' }
        }
      }
    }
  `)}`;

  return Response.redirect(chartUrl);
};