import Image from "next/image";
import {
  initMemoryIdentityWallet,
  createKYCAgeCredential,
  createIdentity,
} from "../../utils/wallet-setup";
import { ethers } from "ethers";
import { clientSideRequest } from "@/utils/api";

export default function IssueCredential() {
  const issueCredential = async () => {
    await clientSideRequest("/api/polygon-id/credential/issue", {});
  };

  return (
    <div>
      <button onClick={issueCredential}>issue credential</button>
    </div>
  );
}
