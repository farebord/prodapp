import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { theme } from "./theme.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import { DeleteDialogProvider } from "./providers/DeleteDialogContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <DeleteDialogProvider>
        <RouterProvider router={router} />
      </DeleteDialogProvider>
    </ChakraProvider>
  </React.StrictMode>
);
