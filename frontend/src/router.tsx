import { createBrowserRouter } from "react-router-dom";
import { Index } from "./pages/Index";
import { Product } from "./pages/Product";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/product/:productId",
    element: <Product />,
  },
]);
