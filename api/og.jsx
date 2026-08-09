import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name') || 'Builder';
    const role = searchParams.get('role') || 'Builder';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0C372B',
            color: '#FFD93D',
            fontFamily: 'sans-serif',
            padding: '40px',
            border: '12px solid #FFD93D',
          }}
        >
          <div style={{ fontSize: 32, color: '#FFFFFF', marginBottom: 20 }}>
            HACKER HOUSE GOA 2026
          </div>
          <div style={{ fontSize: 64, fontWeight: 'bold', textAlign: 'center' }}>
            {name}
          </div>
          <div style={{ fontSize: 36, color: '#E93B67', marginTop: 10 }}>
            {role}
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 30,
              fontSize: 24,
              color: '#FFFFFF',
            }}
          >
            #FrameInGoa • hh-goa-id-builder.vercel.app
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response(`Failed to generate OG image`, { status: 500 });
  }
}