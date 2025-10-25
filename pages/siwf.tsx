// pages/siwf.tsx
export default function SIWF() {
  return (
    <div style={{ padding: 40, textAlign: "center", fontFamily: "sans-serif" }}>
      <h1>Portfolio Pulse</h1>
      <p>Sign in with Farcaster</p>
      <a
        href={`https://warpcast.com/~/siwf?domain=${process.env.PUBLIC_URL}&uri=${process.env.PUBLIC_URL}/api/frame`}
      >
        <button
          style={{
            padding: "12px 24px",
            fontSize: 18,
            background: "#8b5cf6",
            color: "white",
            border: "none",
            borderRadius: 8,
          }}
        >
          Connect Wallet
        </button>
      </a>
    </div>
  );
}
