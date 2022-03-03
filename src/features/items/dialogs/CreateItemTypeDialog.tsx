import { Button, Classes, Dialog } from "@blueprintjs/core";
import { FunctionComponent } from "react";
import { FieldValues } from "react-hook-form";
import { useSWRConfig } from "swr";
import ListResponse from "../../common/models/ListResponse";
import { useEntryLinks } from "../../links/EntryLinksContext";
import ItemTypeForm from "../forms/ItemTypeForm";
import EmbeddedItemTypeModel from "../models/EmbeddedItemTypeModel";
import ItemTypeModel from "../models/ItemTypeModel";

const formId = "createItemTypeForm";

interface CreateItemTypeDialogProps {
  isOpen: boolean;
  handleClose: () => void;
}

const CreateItemTypeDialog: FunctionComponent<CreateItemTypeDialogProps> = ({
  isOpen,
  handleClose,
}) => {
  const entryLinks = useEntryLinks();
  const { mutate } = useSWRConfig();

  const onSubmit = (data: FieldValues) => {
    const itemTypeLink = entryLinks?.itemTypes?.href;

    if (itemTypeLink) {
      fetch(itemTypeLink, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => response.json() as Promise<ItemTypeModel>)
        .then((newItemType) => {
          mutate<ListResponse<EmbeddedItemTypeModel>>(
            itemTypeLink,
            async (embeddedData) => {
              return {
                _embedded: {
                  itemTypes: [
                    ...(embeddedData?._embedded?.itemTypes || []),
                    newItemType,
                  ],
                },
                _links: embeddedData?._links || {},
              };
            },
            false
          );
        });
    }

    handleClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title="New item type"
      canOutsideClickClose={false}
    >
      <div className={Classes.DIALOG_BODY}>
        <ItemTypeForm formId={formId} onSubmit={onSubmit} />
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={handleClose}>Close</Button>
          <Button form={formId} type="submit">
            Submit
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default CreateItemTypeDialog;
