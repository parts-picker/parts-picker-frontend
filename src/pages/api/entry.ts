import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export type EntryLinksUrlApiResponse = {
  url: string;
};

/**
 * @deprecated Will be removed when migration to app router is finished.
 */
const handler: NextApiHandler = (
  _: NextApiRequest,
  res: NextApiResponse<EntryLinksUrlApiResponse | null>
) => {
  if (!process.env.ENTRY_LINKS_URL) {
    res.status(404).json(null);
  } else {
    res.status(200).json({ url: process.env.ENTRY_LINKS_URL });
  }
};

export default handler;
