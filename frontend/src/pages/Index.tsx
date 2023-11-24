import { Stack } from "@chakra-ui/react";
import { useProducts } from "../hooks/useProduct";
import { ProductTable } from "../components/ProductTable";
import { useEffect } from "react";
import { ToolBar } from "../components/ToolsBar";

export const Index = () => {
  const { fetch } = useProducts();

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <Stack gap="4" padding="3rem">
      <ToolBar />
      <ProductTable />
    </Stack>
  );
};
