import React from "react";
import { EntryLinksContext } from "../EntryLinksContext";

export const useEntryLinks = () => React.useContext(EntryLinksContext);
