import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import { IProduct } from "../types/product";
import { useProducts } from "../hooks/useProduct";

interface DeleteDialog {
  product?: IProduct;
  onDelete: () => void;
  open: boolean;
  onClose: () => void;
}

export const DeleteDialog = ({
  product,
  onDelete,
  open,
  onClose,
}: DeleteDialog) => {
  const { deleteProduct } = useProducts();
  const cancelRef = useRef(null);

  const handleConfirmDelete = () => {
    if (!product || !product.id) {
      throw new Error("Trying to delete a product that doesn't exist");
    }
    deleteProduct(product.id.toString());
    onClose();
    onDelete();
  };

  return (
    <AlertDialog
      isOpen={open}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Product {product?.title}
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleConfirmDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
