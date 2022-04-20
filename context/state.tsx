import React, { createContext, useState } from "react";

const CandyBiteContext = createContext<any>({} as any);

export const CandyBiteProvider = ({ children }: {children: any}) => {
  const [selectedCandy, setSelectedCandy] = useState(null);
  const value = {
    selectedCandy,
    setSelectedCandy
  }

  return (
    <CandyBiteContext.Provider value={value}>
      { children }
    </CandyBiteContext.Provider>
  )
}

export default CandyBiteContext;