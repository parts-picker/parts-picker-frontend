import React from "react";
import EntryLinksModel from "./models/EntryLinksModel";

type EntryLinksProviderProps = {
  children: React.ReactNode;
  value: EntryLinksModel;
};

const EntryLinksContext = React.createContext<EntryLinksModel | undefined>(
  undefined
);

const useEntryLinks = () => React.useContext(EntryLinksContext);

const EntryLinksProvider = ({ children, value }: EntryLinksProviderProps) => {
  return (
    <EntryLinksContext.Provider value={value}>
      {children}
    </EntryLinksContext.Provider>
  );
};

export { EntryLinksProvider, useEntryLinks };
