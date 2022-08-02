import ResponseError from "../../models/ResponseError";

const defaultFetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new ResponseError(
      "An error occurred while fetching data.",
      res.status
    );
  }

  return res.json();
};

export default defaultFetcher;
