import Head from "next/head";
import Image from "next/image";
import IssueCredential from "@/components/issue-credential/IssueCredential";

export default function CredentialIssue() {
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
    <div>
      <IssueCredential />
    </div>
  );
}
