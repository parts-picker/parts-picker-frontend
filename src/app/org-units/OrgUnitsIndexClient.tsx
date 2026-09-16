"use client";

import { FC } from "react";
import OrgUnitMembershipListView from "@/features/orgUnits/components/OrgUnitMembershipListView";
import { ALLOWED_PAGE_SIZES } from "@/features/common/utils/ConfigReaderUtils";
import { usePageQueryParamsV2 } from "@/features/common/utils/pageQueries/usePageQueryParamsV2";

const OrgUnitsIndexClient: FC = () => {
  const pageQueryOptions = usePageQueryParamsV2();

  return (
    <OrgUnitMembershipListView
      pageQueryOptions={{
        ...pageQueryOptions,
        allowedPageSizes: ALLOWED_PAGE_SIZES,
      }}
    />
  );
};

export default OrgUnitsIndexClient;
