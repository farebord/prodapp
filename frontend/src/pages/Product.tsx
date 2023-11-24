import { ArrowLeftIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Kbd,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useProducts, useSingleProduct } from "../hooks/useProduct";
import { IProduct } from "../types/product";
import { validateProducts } from "../util/validation";

interface ProductColumn {
  name: keyof IProduct;
  title: string;
  type?: "number";
}

const PRODUCT_COLUMNS: ProductColumn[] = [
  {
    name: "title",
    title: "Product",
  },
  {
    name: "category",
    title: "Category",
  },
  {
    name: "price",
    title: "Price",
    type: "number",
  },
  {
    name: "description",
    title: "Description",
  },
];

export const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { fetch, loading, data: product, fetched } = useSingleProduct();
  const { updateProduct, deleteProduct } = useProducts();

  const handleFieldSave = (column: ProductColumn, nextValue: string) => {
    if (!product) {
      throw new Error("Trying to update a product that doesn't exist");
    }
    let newValue: string | number = nextValue;
    if (column.type === "number") {
      newValue = parseFloat(nextValue);
    }
    const productUpdated = { ...product, [column.name]: newValue };
    validateProducts(productUpdated);
    updateProduct(productUpdated);
  };

  const handleDelete = () => {
    if (!productId) {
      throw new Error("Trying to delete a product that doesn't exist");
    }
    navigate("/");
    deleteProduct(productId);
  };

  useEffect(() => {
    const fetchOrNavigate = async () => {
      if (!productId) {
        return;
      }
      try {
        await fetch(productId?.toString());
      } catch (e) {
        navigate("/");
      }
    };
    fetchOrNavigate();
  }, [productId, fetch, navigate]);

  return (
    <Stack flexDirection="column" padding="3rem">
      <Stack gap={4} direction="row">
        <Button size="sm" onClick={() => navigate("/")} variant="ghost">
          <ArrowLeftIcon mr="4" /> Go Back
        </Button>
        <Button colorScheme="red" size="sm" onClick={handleDelete}>
          <DeleteIcon />
        </Button>
      </Stack>
      {loading && <Text size="xl">Loading...</Text>}
      {fetched && (
        <>
          <Text>
            To modify a field please click on it, change it and then hit{" "}
            <Kbd>Enter</Kbd>.
          </Text>
          {PRODUCT_COLUMNS.map((column) => (
            <Stack
              key={`${column.name}-field`}
              flexDirection="row"
              alignItems="center"
            >
              <Text fontSize="xl" color="lightgray" mr="4">
                {column.title}:
              </Text>
              <Editable
                fontSize="xl"
                defaultValue={product?.[column.name]?.toString()}
                onSubmit={(nextValue) => handleFieldSave(column, nextValue)}
              >
                <EditablePreview />
                <EditableInput type={column.type} />
              </Editable>
            </Stack>
          ))}
        </>
      )}
    </Stack>
  );
};
