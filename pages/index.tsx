import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.scss";
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
  initPackageManager,
} from "../utils/wallet-setup";
import IssueCredential from "@/components/issue-credential/IssueCredential";
import { clientSideRequest } from "@/utils/api";

export default function Home() {
  /*const createIdentity = async (identityWallet: IIdentityWallet) => {
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
      credential,
    };
  };

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
  };*/

  return (
    <div className={styles.container}>
      <IssueCredential />
    </div>
  );
}
