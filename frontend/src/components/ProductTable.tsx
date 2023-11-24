import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ViewIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProduct";
import { IProduct } from "../types/product";
import { useDeleteDialog } from "../hooks/useDeleteDialog";

export const ProductTable = () => {
  const { showDeleteDialog } = useDeleteDialog();
  const { data: products, debouncing: isDebouncing, loading } = useProducts();
  const navigate = useNavigate();

  const handleRemove = (product: IProduct) => {
    showDeleteDialog(product);
  };

  return (
    <Box
      opacity={isDebouncing || loading ? 0.5 : 1}
      transition={
        isDebouncing || loading
          ? "opacity 0.2s 0.2s linear"
          : "opacity 0s 0s linear"
      }
    >
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product) => (
              <Tr key={product.id}>
                <Td>{product.id}</Td>
                <Td>{product.title}</Td>
                <Td>{product.category}</Td>
                <Td isNumeric>$ {product.price}</Td>
                <Td display="flex" justifyContent="right" gap="4">
                  <Button
                    onClick={() => navigate(`/product/${product.id}`)}
                    size="sm"
                  >
                    <ViewIcon />
                  </Button>
                  <Button size="sm" onClick={() => handleRemove(product)}>
                    <DeleteIcon />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Description</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Actions</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
};
