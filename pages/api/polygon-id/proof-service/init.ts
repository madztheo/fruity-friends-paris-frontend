// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { initCircuitStorage, initProofService } from "@/utils/wallet-setup";
import {
  ICircuitStorage,
  ICredentialWallet,
  IDataStorage,
  IIdentityWallet,
  IStateStorage,
  ProofService,
} from "@0xpolygonid/js-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProofService>
) {
  const {
    stateStorage,
    credentialWallet,
    identityWallet,
    circuitStorage,
  }: {
    stateStorage: IStateStorage;
    credentialWallet: ICredentialWallet;
    identityWallet: IIdentityWallet;
    circuitStorage: ICircuitStorage;
  } = req.body;
  const result = await initProofService(
    identityWallet,
    credentialWallet,
    stateStorage,
    circuitStorage
  );
  res.status(200).json(result);
}
