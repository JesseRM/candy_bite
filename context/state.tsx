import React, { createContext, useState } from "react";

const CandyBiteContext = createContext<any>({} as any);

export const CandyBiteProvider = ({ children }: {children: any}) => {
  const [selectedCandy, setSelectedCandy] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const value = {
    selectedCandy,
    setSelectedCandy,
    searchResults,
    setSearchResults
  }

  return (
    <CandyBiteContext.Provider value={value}>
      { children }
    </CandyBiteContext.Provider>
  )
}

export default CandyBiteContext;