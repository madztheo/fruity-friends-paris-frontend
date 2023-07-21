import Image from 'next/image'
import {
  EthStateStorage,
  CredentialRequest,
  CircuitId,
  IIdentityWallet,
  ICredentialWallet,
  IDataStorage,
  ZeroKnowledgeProofRequest,
  AuthorizationRequestMessage,
  PROTOCOL_CONSTANTS,
  AuthHandler,
  core,
  ZKPRequestWithCredential,
  CredentialStatusType,
} from "@0xpolygonid/js-sdk";

import {
  initDataStorage,
  initIdentityWallet,
  initCredentialWallet,
  initMemoryIdentityWallet,
  initCircuitStorage,
  initProofService,
  initPackageManager
} from "../utils/walletSetup";

import { ethers } from "ethers";
import dotenv from "dotenv";
import IssueCredential from '@/components/issueCredential';
dotenv.config();

const rhsUrl = process.env.RHS_URL as string;
const walletKey = process.env.WALLET_KEY as string;

export default function Home() {


  const createIdentity = async (identityWallet: IIdentityWallet) => {
    const { did, credential } = await identityWallet.createIdentity({
      method: core.DidMethod.Iden3,
      blockchain: core.Blockchain.Polygon,
      networkId: core.NetworkId.Mumbai,
      revocationOpts: {
        type: CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
        id: rhsUrl,
      },
    });

    return {
      did,
      credential
    }
  }

  const createKYCAgeCredential = (did: core.DID) => {
    const credentialRequest: CredentialRequest = {
      credentialSchema:
        "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v3.json",
      type: "KYCAgeCredential",
      credentialSubject: {
        id: did.toString(),
        birthday: 19960424,
        documentType: 99,
      },
      expiration: 12345678888,
      revocationOpts: {
        type: CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
        id: rhsUrl,
      },
    };
    return credentialRequest;
  }

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hey
      <IssueCredential />
    </main>
  )
}
