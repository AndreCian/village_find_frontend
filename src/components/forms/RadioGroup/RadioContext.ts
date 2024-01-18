import React from 'react';

export interface IRadioContext {
  value: string;
  color: string;
  updateValue: (_value: string) => void;
}

export const initialContext: IRadioContext = {
  value: '',
  color: 'primary',
  updateValue: () => {},
};

export const RadioContext: React.Context<IRadioContext> =
  React.createContext(initialContext);
