import { Client } from "@xmtp/xmtp-js";
import { Signer } from "ethers";

export async function initXMTPClient(signer: Signer) {
  console.log(signer)
  // const xmtp = await Client.create(signer);
  // return xmtp;
}

export async function initConversation(xmtp: Client, to: string) {
  const conversation = await xmtp.conversations.newConversation(to);
  return conversation;
}

export async function getAllConversations(xmtp: Client) {
  const conversations = await xmtp.conversations.list();
  return conversations;
}
