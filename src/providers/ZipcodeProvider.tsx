import React, { useEffect, useState } from 'react';

import { getCityFromZipCode } from '@/utils/third-api/zipcode';

interface IZipcodeContext {
  zipcode: string;
  cityName: string;
  changeZipcode: (code: string) => void;
}

export const ZipcodeContext = React.createContext<IZipcodeContext>({
  zipcode: '',
  cityName: '',
  changeZipcode: () => {},
});

interface ISearchbarContextProps {
  children: React.ReactNode;
}

export function ZipcodeProvider({ children }: ISearchbarContextProps) {
  const [zipcode, setZipcode] = useState('');
  const [cityName, setCityName] = useState('');

  useEffect(() => {
    (async () => {
      const name = await getCityFromZipCode(zipcode);
      setCityName(name);
    })();
  }, [zipcode]);

  return (
    <ZipcodeContext.Provider
      value={{ zipcode, cityName, changeZipcode: setZipcode }}
    >
      {children}
    </ZipcodeContext.Provider>
  );
}
