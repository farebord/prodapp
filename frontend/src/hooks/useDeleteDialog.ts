import { useContext } from "react";
import { DeleteDialogContext } from "../providers/DeleteDialogContext";

export const useDeleteDialog = () => {
  const { showDeleteDialog } = useContext(DeleteDialogContext);

  return {
    showDeleteDialog,
  };
};
