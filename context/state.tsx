import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { CandyInfo } from "../interfaces/globalInterfaces";

interface ContextProps {
  selectedCandy: CandyInfo | null;
  setSelectedCandy: Dispatch<SetStateAction<CandyInfo | null>>;
  searchResults: CandyInfo[];
  setSearchResults: Dispatch<SetStateAction<CandyInfo[]>>;
  attemptedSearch: boolean;
  setAttemptedSearch: Dispatch<SetStateAction<boolean>>;
  displayErrorMessage: boolean;
  setDisplayErrorMessage: Dispatch<SetStateAction<boolean>>;
}

interface FCProps {
  children: ReactNode;
}

const CandyBiteContext = createContext<ContextProps>({} as ContextProps);

export const CandyBiteProvider: FC<FCProps> = ({ children }) => {
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
    setDisplayErrorMessage,
  };

  return (
    <CandyBiteContext.Provider value={value}>
      {children}
    </CandyBiteContext.Provider>
  );
};

export default CandyBiteContext;
