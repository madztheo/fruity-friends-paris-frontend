import { Client } from "@xmtp/xmtp-js";
import { Signer } from "ethers";

let xmtp: Client;

export async function initXMTPClient(signer: Signer) {
  if (xmtp) {
    return xmtp;
  }
  xmtp = await Client.create(signer);
  return xmtp;
}

export async function initConversation(xmtp: Client, to: string) {
  const conversation = await xmtp.conversations.newConversation(to);
  return conversation;
}

export async function getAllConversations(xmtp: Client) {
  const conversations = await xmtp.conversations.list();
  return conversations;
}

export async function getConversation(xmtp: Client, address: string) {
  if (!xmtp || !address) {
    return;
  }
  const conversation = (await xmtp.conversations.list()).find(
    (x) => x.peerAddress.toLowerCase() === address.toLowerCase()
  );
  return conversation;
}
