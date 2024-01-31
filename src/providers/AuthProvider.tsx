import React, { useState } from 'react';

export type RoleType = 'admin' | 'vendor' | 'customer' | 'community-organizer';

interface ICustomerProfile {
  _id?: string;
  firstName: string;
  lastName: string;
  zipcode: string;
}

interface ICommunityProfile {
  _id?: string;
  code: string;
  name: string;
  slug?: string;
  images?: {
    logoUrl?: string;
    backgroundUrl?: string;
  };
  shortDesc?: string;
  longDesc?: string;
  announcement?: {
    text?: string;
    updated_at?: string;
  };
}

interface IAccount {
  role: RoleType;
  profile: any;
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
