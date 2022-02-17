import { render, screen } from "@testing-library/react";

import ItemListView from "../ItemListView";

describe("ItemViewList", () => {
  it("renders a table", () => {
    render(<ItemListView items={[]} />);

    const table = screen.getByRole("table");

    expect(table).toBeInTheDocument();
  });
});
