import { GetServerSideProps } from "next";
import { siwf } from "@farcaster/frames-sdk";
import crypto from "crypto";
import { ethers } from "ethers";

export default function SIWF({ siwfUrl }: { siwfUrl: string }) {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Connect to Portfolio Pulse</h1>
      <a href={siwfUrl}>
        <button style={{ padding: "10px 20px", fontSize: "18px" }}>
          Sign In with Farcaster
        </button>
      </a>
      <p>Redirects back to your Frame!</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const nonce = crypto.randomBytes(32).toString("hex");
  const siwfUrl = siwf.generate({
    domain: process.env.PUBLIC_URL!,
    nonce,
    statement: "Sign in to Portfolio Pulse",
    uri: `${process.env.PUBLIC_URL}/api/siwf-callback?nonce=${nonce}`,
    version: "1",
  });

  return { props: { siwfUrl } };
};
