// pages/siwf.tsx
import { GetServerSideProps } from "next";

export default function SIWF({ siwfUrl }: { siwfUrl: string }) {
  return (
    <div
      style={{ padding: "40px", textAlign: "center", fontFamily: "sans-serif" }}
    >
      <h1>Portfolio Pulse</h1>
      <p>Sign in with your Farcaster wallet</p>
      <a href={siwfUrl}>
        <button
          style={{
            padding: "12px 24px",
            fontSize: "18px",
            cursor: "pointer",
            background: "#8b5cf6",
            color: "white",
            border: "none",
            borderRadius: "8px",
          }}
        >
          Connect Wallet
        </button>
      </a>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const siwfUrl = `https://warpcast.com/~/siwf?domain=${process.env.PUBLIC_URL}&uri=${process.env.PUBLIC_URL}/api/frame`;
  return { props: { siwfUrl } };
};
