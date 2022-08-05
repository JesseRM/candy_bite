import React, { createContext, useState } from "react";
import { CandyInfo } from "../interfaces/globalInterfaces";

interface ContextProps {
  selectedCandy: CandyInfo | null;
  setSelectedCandy: React.Dispatch<React.SetStateAction<CandyInfo | null>>;
  searchResults: CandyInfo[];
  setSearchResults: React.Dispatch<React.SetStateAction<CandyInfo[]>>;
  attemptedSearch: boolean;
  setAttemptedSearch: React.Dispatch<React.SetStateAction<boolean>>;
  displayErrorMessage: boolean;
  setDisplayErrorMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

const CandyBiteContext = createContext<ContextProps>({} as ContextProps);

export const CandyBiteProvider = ({ children }: {children: any}) => {
  const [selectedCandy, setSelectedCandy] = useState<CandyInfo | null>(null);
  const [searchResults, setSearchResults] = useState<CandyInfo[]>([]);
  const [attemptedSearch, setAttemptedSearch] = useState(false);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  const value: ContextProps = {
    selectedCandy,
    setSelectedCandy,
    searchResults,
    setSearchResults,
    attemptedSearch,
    setAttemptedSearch,
    displayErrorMessage,
    setDisplayErrorMessage
  }

  return (
    <CandyBiteContext.Provider value={value}>
      { children }
    </CandyBiteContext.Provider>
  )
}

export default CandyBiteContext;