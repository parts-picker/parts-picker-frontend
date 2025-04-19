import { useEffect } from "react";
import { parsePageQueryParams } from "./ParsePageQueryParams";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const usePageQueryValidator = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageParam = searchParams?.get("page");
  const sizeParam = searchParams?.get("size");

  useEffect(() => {
    const {
      valid,
      parsedPage: page,
      parsedSize: size,
    } = parsePageQueryParams(sizeParam, pageParam);

    if (!valid) {
      const updatedSearchParams = new URLSearchParams(searchParams ?? "");
      updatedSearchParams.set("page", page.toString());
      updatedSearchParams.set("size", size.toString());

      router.replace(`${pathname}?${updatedSearchParams.toString()}`);
    }
  }, [router, pathname, searchParams, sizeParam, pageParam]);
};
