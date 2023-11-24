import { createContext, useState } from "react";
import { IProduct } from "../types/product";
import { DeleteDialog } from "../components/DeleteDialog";

interface IDeleteDialogContext {
  showDeleteDialog: (product: IProduct, onDelete?: () => void) => void;
}

export const DeleteDialogContext = createContext<IDeleteDialogContext>({
  showDeleteDialog: () => {},
});

export const DeleteDialogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [product, setProduct] = useState<IProduct | undefined>();
  const [open, setOpen] = useState(false);
  const [onDeleteCallback, setOnDeleteCallback] = useState<
    (() => void) | null
  >();

  const showDeleteDialog = (product: IProduct, onDelete?: () => void) => {
    setProduct(product);
    setOnDeleteCallback(onDelete);
    setOpen(true);
  };

  const onDelete = () => {
    if (onDeleteCallback) {
      onDeleteCallback();
    }
  };

  const onClose = () => {
    setProduct(undefined);
    setOnDeleteCallback(null);
    setOpen(false);
  };

  return (
    <DeleteDialogContext.Provider value={{ showDeleteDialog }}>
      {children}
      <DeleteDialog
        product={product}
        onClose={onClose}
        open={open}
        onDelete={onDelete}
      />
    </DeleteDialogContext.Provider>
  );
};
