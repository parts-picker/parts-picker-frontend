import React from "react";
import { EntryLinksContext } from "../EntryLinksContextV2";

export const useEntryLinks = () => React.useContext(EntryLinksContext);
