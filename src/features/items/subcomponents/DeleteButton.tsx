import { Button } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { FC, useState } from "react";
import { useSWRConfig } from "swr";
import ConfirmPopover from "../../common/components/ConfirmPopover";
import { ClickMouseEvent } from "../../common/types/ClickMouseEvent";
import { AppToaster } from "../../common/utils/Toaster";
import { useEntryLinks } from "../../links/EntryLinksContext";
import HttpMethods from "../../links/types/HttpMethods";
import { Links } from "../../links/types/Links";
import { EmbeddedItemTypes } from "../models/EmbeddedItemTypes";

interface DeleteButtonProps {
  name: string;
  links?: Links;
}

const DeleteButton: FC<DeleteButtonProps> = ({ name, links }) => {
  const selfHref = links?.self?.href;

  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const entryLinks = useEntryLinks();
  const { mutate } = useSWRConfig();

  if (!selfHref || !links?.self?.methods.includes(HttpMethods.DELETE)) {
    return null;
  }

  const handleDelete = (event: ClickMouseEvent) => {
    event.stopPropagation();

    fetch(selfHref, {
      method: "DELETE",
    }).then(() => {
      mutate<EmbeddedItemTypes>(
        entryLinks?.itemTypes.href,
        async (currentItemTypesResponse) => {
          const newItemTypes =
            currentItemTypesResponse?._embedded.itemTypes.filter(
              (itemType) => itemType._links.self.href !== selfHref
            );

          return {
            _embedded: { itemTypes: newItemTypes || [] },
            _links: currentItemTypesResponse?._links || {},
          };
        },
        false
      );
    });

    AppToaster?.show?.({
      message: "Item type " + name + " was deleted",
      intent: "success",
      icon: IconNames.CONFIRM,
    });
    setConfirmOpen(false);
  };

  const handleOpen = (event: ClickMouseEvent) => {
    event.stopPropagation();
    setConfirmOpen(true);
  };

  return (
    <ConfirmPopover
      isOpen={isConfirmOpen}
      setIsOpen={setConfirmOpen}
      actionName={"Delete"}
      action={handleDelete}
      heading={"Confirm delete"}
      description={
        <>
          Delete item type <b>{name}</b>
        </>
      }
    >
      <Button minimal icon={IconNames.DELETE} onClick={handleOpen} />
    </ConfirmPopover>
  );
};

export default DeleteButton;
