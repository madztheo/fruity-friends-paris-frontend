import { Web3AuthModalPack, Web3AuthConfig } from "@safe-global/auth-kit";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import { Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { ethers } from "ethers";

const WEB3_AUTH_CLIENT_ID = process.env
  .NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID as string;

export async function initSafeAuthKit() {
  const options: Web3AuthOptions = {
    clientId: WEB3_AUTH_CLIENT_ID,
    web3AuthNetwork: "testnet",
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x5",
      rpcTarget: "https://rpc.ankr.com/eth_goerli",
    },
    uiConfig: {
      theme: "dark",
      loginMethodsOrder: ["google", "facebook"],
    },
  };

  const modalConfig = {
    [WALLET_ADAPTERS.TORUS_EVM]: {
      label: "torus",
      showOnModal: false,
    },
    [WALLET_ADAPTERS.METAMASK]: {
      label: "metamask",
      showOnDesktop: true,
      showOnMobile: false,
    },
  };

  const openloginAdapter = new OpenloginAdapter({
    loginSettings: {
      mfaLevel: "mandatory",
    },
    adapterSettings: {
      uxMode: "popup",
      whiteLabel: {
        name: "Safe",
      },
    },
  });

  const web3AuthConfig: Web3AuthConfig = {
    txServiceUrl: "https://safe-transaction-goerli.safe.global",
  };

  // Instantiate and initialize the pack
  const web3AuthModalPack = new Web3AuthModalPack(web3AuthConfig);
  await web3AuthModalPack.init({
    options,
    adapters: [openloginAdapter as any],
    modalConfig,
  });

  return web3AuthModalPack;
}

export async function signMessage(
  web3AuthModalPack: Web3AuthModalPack,
  message: string
) {
  const provider = new ethers.providers.Web3Provider(
    web3AuthModalPack.getProvider()!
  );
  const signer = provider.getSigner();
  return signer.signMessage(message);
}

export async function sendTransaction(
  web3AuthModalPack: Web3AuthModalPack,
  tx: ethers.utils.Deferrable<ethers.providers.TransactionRequest>
) {
  const provider = new ethers.providers.Web3Provider(
    web3AuthModalPack.getProvider()!
  );
  const signer = provider.getSigner();
  return signer.sendTransaction(tx);
}
