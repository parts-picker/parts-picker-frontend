import {
  columnVisibilityFeature,
  rowSortingFeature,
  tableFeatures,
} from "@tanstack/react-table";

export const sortableTableFeatures = tableFeatures({
  columnVisibilityFeature,
  rowSortingFeature,
});

export type SortableTableFeatures = typeof sortableTableFeatures;
