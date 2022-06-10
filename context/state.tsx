import React, { createContext, useState } from "react";
import { CandyInfo } from "../interfaces/globalInterfaces";

interface ContextProps {
  selectedCandy: CandyInfo | null;
  setSelectedCandy: React.Dispatch<React.SetStateAction<CandyInfo | null>>;
  searchResults: CandyInfo[];
  setSearchResults: React.Dispatch<React.SetStateAction<CandyInfo[]>>
}

const CandyBiteContext = createContext<ContextProps>({} as ContextProps);

export const CandyBiteProvider = ({ children }: {children: any}) => {
  const [selectedCandy, setSelectedCandy] = useState<CandyInfo | null>(null);
  const [searchResults, setSearchResults] = useState<CandyInfo[]>([]);
  const value: ContextProps = {
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