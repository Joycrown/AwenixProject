export interface productProps {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  closeFn: () => void;
}

export interface userProps {
  accessToken: string;
  refreshToken: string;
  name: string;
  isLogged: boolean
}