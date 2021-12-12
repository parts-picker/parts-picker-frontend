import { HTMLTable } from "@blueprintjs/core";
import { FC } from "react";
import ItemModel from "./models/ItemModel";

interface ItemListViewProps {
  items: ItemModel[];
}

const ItemListView: FC<ItemListViewProps> = (props) => {
  const createRows = (rows: ItemModel[]) => {
    if (!rows) {
      return null;
    }

    return rows.map((row: ItemModel) => (
      <tr key={"item-row-" + row.id}>
        <td>{row.id}</td>
        <td>{row.status}</td>
        <td>{row.condition}</td>
        <td>{row.note}</td>
      </tr>
    ));
  };

  return (
    <div>
      <HTMLTable striped interactive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Condition</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>{createRows(props.items)}</tbody>
      </HTMLTable>
    </div>
  );
};

export default ItemListView;
