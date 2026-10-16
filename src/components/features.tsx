import {
  createSortedRowModel,
  tableFeatures,
  rowSortingFeature,
} from "@tanstack/react-table";

export const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
});