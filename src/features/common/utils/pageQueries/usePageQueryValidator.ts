import { useRouter } from "next/router";
import { useEffect } from "react";
import { parsePageQueryParams } from "./ParsePageQueryParams";

export const usePageQueryValidator = () => {
  const router = useRouter();

  useEffect(() => {
    const {
      valid,
      parsedPage: page,
      parsedSize: size,
    } = parsePageQueryParams(router.query.size, router.query.page);

    if (!valid) {
      router.push({ query: { ...router.query, size, page } }, undefined, {
        shallow: true,
      });
    }
  }, [router, router.query.size, router.query.page]);
};
