import React, { useState } from 'react';

type IRole = 'admin' | 'vendor' | 'customer' | 'community-organizer';

interface ICommunityOrganizer {
  code: string;
  slug?: string;
  logoUrl?: string;
  imageUrl?: string;
  shortDesc?: string;
  longDesc?: string;
}

interface IAccount {
  role: IRole;
  profile: ICommunityOrganizer | any;
}

interface IAuthContext {
  isLogin: boolean;
  account?: IAccount;
  userName: string;
  setIsLogin: (_: boolean) => void;
  setAccount: (_: IAccount) => void;
}

export const AuthContext = React.createContext<IAuthContext>({
  isLogin: false,
  userName: '',
  setIsLogin: () => {},
  setAccount: () => {},
});

interface IAuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: IAuthProviderProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [account, setAccount] = useState<IAccount>({} as IAccount);
  const [userName, setUserName] = useState('Brandon');

  return (
    <AuthContext.Provider
      value={{ isLogin, setIsLogin, userName, account, setAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
}
