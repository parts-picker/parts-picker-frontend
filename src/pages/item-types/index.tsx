import { Button, H1 } from "@blueprintjs/core";
import React, { useState } from "react";
import { FC } from "react";
import ItemTypeListView from "../../features/items/ItemTypeListView";
import { useEntryLinkFor } from "../../features/links/EntryLinksContext";
import { IconNames } from "@blueprintjs/icons";
import CreateItemTypeDialog from "../../features/items/dialogs/CreateItemTypeDialog";
import { LinkNames } from "../../features/links/types/LinkModel";
import { useRouter } from "next/router";
import { z, ZodTypeAny } from "zod";
import { GetServerSideProps } from "next";
import { convertCommaSeparatedStringToNumberArray } from "../../features/common/utils/ConfigReaderUtils";

const ItemTypesIndex: FC = () => {
  const itemTypeCreateLink = useEntryLinkFor(LinkNames.CREATE, "itemTypes");
  const router = useRouter();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const handleOpenCreateDialog = () => {
    setCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setCreateDialogOpen(false);
  };

  const handleSetPage = (page: number) =>
    shallowRouteWithParams(page, Number(router.query.size));
  const handleSetSize = (size: number) =>
    shallowRouteWithParams(Number(router.query.page), size);

  const shallowRouteWithParams = (page: number, size: number) => {
    router.push(`?page=${page}&size=${size}`, undefined, { shallow: true });

    (document?.activeElement as HTMLElement)?.blur();
  };

  return (
    <div>
      <H1> Item Inventory </H1>
      {itemTypeCreateLink ? (
        <Button icon={IconNames.ADD} onClick={handleOpenCreateDialog} />
      ) : null}
      <CreateItemTypeDialog
        isOpen={createDialogOpen}
        handleClose={handleCloseCreateDialog}
      />
      <ItemTypeListView
        pageQueryOptions={{
          requestedPageNumber: Number(router.query.page),
          setRequestedPageNumber: handleSetPage,
          requestedPageSize: Number(router.query.size),
          setRequestedPageSize: handleSetSize,
          allowedPageSizes: allowedSizes,
          sizePreprocessingSchema: sizePreprocessingSchema,
        }}
      />
    </div>
  );
};

export default ItemTypesIndex;

const pagePreprocessingSchema = z.preprocess(
  (val: unknown) => Number(val),
  z.number().nonnegative()
);

const allowedSizes = convertCommaSeparatedStringToNumberArray(
  process.env.NEXT_PUBLIC_CHOOSABLE_PAGE_SIZES || "10,20"
);
const allowedLiterals = allowedSizes.map((number) => z.literal(number));
const sizeSchema = z.union(
  allowedLiterals as unknown as [ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]] //TODO fix typing
);
const sizePreprocessingSchema = z.preprocess(
  (val: unknown) => Number(val),
  sizeSchema
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let valid = true;

  let size;
  try {
    size = sizePreprocessingSchema.parse(query.size);
  } catch (e: unknown) {
    size = process.env.NEXT_PUBLIC_DEFAULT_PAGE_SIZE || 10;
    valid = false;
  }

  let page;
  try {
    page = pagePreprocessingSchema.parse(query.page);
  } catch (e: unknown) {
    page = process.env.NEXT_PUBLIC_DEFAULT_PAGE_NUMBER || 0;
    valid = false;
  }

  if (!valid) {
    return {
      redirect: {
        permanent: false,
        destination: `/item-types?page=${page}&size=${size}`,
      },
    };
  }

  return { props: {} };
};
