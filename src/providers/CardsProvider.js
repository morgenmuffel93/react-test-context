import React from 'react';

const myContext = React.createContext();

export const CardsProvider = myContext.Provider;
export const CardsConsumer = myContext.Consumer;