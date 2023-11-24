import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { SyntheticEvent, useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { useProducts } from "../hooks/useProduct";

export const ToolBar = () => {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce<string>(search, 500);
  const { generateMockProducts, fetch, setDebouncing } = useProducts();

  const handleSearch = (e: SyntheticEvent<HTMLInputElement>) => {
    setDebouncing(true);
    setSearch(e.currentTarget.value);
  };

  useEffect(() => {
    fetch(debouncedSearch);
  }, [debouncedSearch, fetch]);

  return (
    <Stack direction="row">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="search"
          placeholder="Type to search product"
          value={search}
          onChange={handleSearch}
        />
      </InputGroup>
      <Button flexShrink={0} variant="outline">
        Add Product
      </Button>
      <Button flexShrink={0} variant="outline" onClick={generateMockProducts}>
        Generate Products
      </Button>
    </Stack>
  );
};
