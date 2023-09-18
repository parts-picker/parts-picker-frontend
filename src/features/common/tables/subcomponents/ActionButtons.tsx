import { PropsWithChildren, ReactNode } from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { ResponseModel } from "../../../links/types/ResponseModel";
import { KeyedMutator } from "swr";
import { EmbeddedModels } from "../../models/EmbeddedModels";

interface ActionButtonsProps<
  Content extends ResponseModel,
  ListResponse extends EmbeddedModels
> {
  object: Content;
  setEditData: (editData: Content | undefined) => void;
  objectListMutate: KeyedMutator<ListResponse>;
  deleteNotification: ReactNode;
  deleteConfirmDescription?: ReactNode;
}

const ActionButtons = <
  Content extends ResponseModel,
  ListResponse extends EmbeddedModels
>({
  object,
  setEditData,
  objectListMutate,
  deleteNotification,
  deleteConfirmDescription,
}: PropsWithChildren<ActionButtonsProps<Content, ListResponse>>) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <EditButton currentData={object} setEditData={setEditData} />
      <DeleteButton
        objectToDelete={object}
        objectListMutate={objectListMutate}
        deleteNotification={deleteNotification}
        confirmDescription={deleteConfirmDescription}
      />
    </div>
  );
};

export default ActionButtons;
