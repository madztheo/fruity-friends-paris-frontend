import apple from "@/public/img/apple_14d9a77b-5dda-4435-a501-58fee28b2b34.jpg";
import banana from "@/public/img/banana_0ade8e15-39eb-427c-b7e0-729a02d7875f.jpg";
import cherries from "@/public/img/cherries_39e079ce-1acf-486a-8030-0093ddedd73d.jpg";
import lemon from "@/public/img/lemon_33bcd234-d7a7-4947-82dd-44ccf6017a6a.jpg";
import peaches from "@/public/img/peaches_92806976-d127-4c21-af0c-cba5d65c5931.jpg";
import strawberries from "@/public/img/strawberries_9f3faa73-9cf4-4962-ab94-9b9935d82006.jpg";
import watermelon from "@/public/img/watermelon_86050a4b-d2f8-4a29-af5e-0bc2b3161244.jpg";

export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatAddress(address: string) {
  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";
}

export function getImageByIndex(index: number) {
  switch (index) {
    case 0:
      return apple;
    case 1:
      return banana;
    case 2:
      return cherries;
    case 3:
      return lemon;
    case 4:
      return peaches;
    case 5:
      return strawberries;
    case 6:
      return watermelon;
    default:
      return apple;
  }
}

export function getImageByIndexPath(index: number) {
  const basePath = "https://fruity-friends-paris-frontend.vercel.app/img";
  switch (index) {
    case 0:
      return `${basePath}/apple_14d9a77b-5dda-4435-a501-58fee28b2b34.jpg`;
    case 1:
      return `${basePath}/banana_0ade8e15-39eb-427c-b7e0-729a02d7875f.jpg`;
    case 2:
      return `${basePath}/cherries_39e079ce-1acf-486a-8030-0093ddedd73d.jpg`;
    case 3:
      return `${basePath}/lemon_33bcd234-d7a7-4947-82dd-44ccf6017a6a.jpg`;
    case 4:
      return `${basePath}/peaches_92806976-d127-4c21-af0c-cba5d65c5931.jpg`;
    case 5:
      return `${basePath}/strawberries_9f3faa73-9cf4-4962-ab94-9b9935d82006.jpg`;
    case 6:
      return `${basePath}/watermelon_86050a4b-d2f8-4a29-af5e-0bc2b3161244.jpg`;
    default:
      return `${basePath}/apple_14d9a77b-5dda-4435-a501-58fee28b2b34.jpg`;
  }
}

export function getRandomImagePath() {
  const index = Math.floor(Math.random() * 7);
  return getImageByIndexPath(index);
}
