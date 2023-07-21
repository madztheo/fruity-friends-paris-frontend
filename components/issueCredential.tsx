"use client";
import Image from 'next/image'

import {
  initMemoryIdentityWallet,
  createKYCAgeCredential,
  createIdentity
} from "../utils/walletSetup";

import { ethers } from "ethers";
export default function IssueCredential() {


  const issueCredential = async () => {
    console.log("=============== issue credential ===============");

    let { dataStorage, identityWallet } = await initMemoryIdentityWallet();

    const { did: userDID, credential: authBJJCredentialUser } =
      await createIdentity(identityWallet);

    console.log("=============== user did ===============");
    console.log(userDID.toString());

    const { did: issuerDID, credential: issuerAuthBJJCredential } =
      await createIdentity(identityWallet);

    const credentialRequest = createKYCAgeCredential(userDID);
    const credential = await identityWallet.issueCredential(
      issuerDID,
      credentialRequest
    );

    console.log("===============  credential ===============");
    console.log(JSON.stringify(credential));

    await dataStorage.credential.saveCredential(credential);
  }


  return (
    <div>
      <button onClick={issueCredential}>issue credential</button>
    </div>
  )
}
