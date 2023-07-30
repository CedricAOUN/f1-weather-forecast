"use client";

import { createContext, useContext, useState } from "react";

const CountdownContext = createContext<any>({});

export const CountdownContextProvider = ({ children }) => {
  const [countdownEnded, setCountdownEnded] = useState(0);

  return (
    <CountdownContext.Provider value={{ countdownEnded, setCountdownEnded }}>
      {children}
    </CountdownContext.Provider>
  );
};

export const useCountdownContext = () => useContext(CountdownContext);
