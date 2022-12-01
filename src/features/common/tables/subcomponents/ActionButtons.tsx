import { PropsWithChildren, ReactNode } from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { ResponseModel } from "../../../links/types/ResponseModel";
import { DeleteRowFunction } from "../hooks/useDeleteRowFunction";

interface ActionButtonsProps<Content extends ResponseModel> {
  backingRow: Content;
  setEditData: (editData: Content | undefined) => void;
  deleteRow: DeleteRowFunction;
  deleteNotification: ReactNode;
  deleteConfirmDescription?: ReactNode;
}

const ActionButtons = <Content extends ResponseModel>({
  backingRow,
  setEditData,
  deleteRow,
  deleteNotification,
  deleteConfirmDescription,
}: PropsWithChildren<ActionButtonsProps<Content>>) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <EditButton currentData={backingRow} setEditData={setEditData} />
      <DeleteButton
        deleteAction={() => deleteRow(backingRow, deleteNotification)}
        confirmDescription={deleteConfirmDescription}
      />
    </div>
  );
};

export default ActionButtons;
