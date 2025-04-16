import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export type EntryLinksUrlApiResponse = {
  url: string;
};

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
