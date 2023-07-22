export type User = {
  _id: string;
  name: string;
  description: string;
  picture: string;
  age: number;
  isWorldcoinVerified: boolean;
  isPolygonIdVerified: boolean;
  address: string;
};

export type Like = {
  from: string;
  to: string;
  match: boolean;
};
