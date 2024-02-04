import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

type HealthApiResponse = {
  status: "UP";
};

const handler: NextApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse<HealthApiResponse>
) => {
  res.status(200).json({ status: "UP" });
};

export default handler;
