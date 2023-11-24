import { url } from "../config/urls";
import { IProduct } from "../types/product";
import { validateProducts } from "../util/validation";
import { create } from "zustand";

interface FetchBaseStore<T> {
  loading: boolean;
  fetched: boolean;
  data: T;
}

interface FetchSingleProductStore extends FetchBaseStore<IProduct | null> {
  fetch: (id: string) => void;
}

const useFetchSingleProductStore = create<FetchSingleProductStore>((set) => ({
  loading: false,
  fetched: false,
  data: null,
  fetch: async (id: string) => {
    set({ loading: true, fetched: false, data: null });
    const response = await fetch(url.API_BASE + "/products/" + id);
    if (!response.ok) throw new Error("Failed to fetch a single product");
    const data = await response.json();
    validateProducts(data);
    set({ loading: false, fetched: true, data: data });
  },
}));

interface FetchProductsStore extends FetchBaseStore<IProduct[]> {
  debouncing: boolean;
  setDebouncing: (debouncing: boolean) => void;
  fetch: (search?: string) => void;
  generateMockProducts: () => void;
  deleteProduct: (id: string) => void;
  updateProduct: (product: IProduct) => void;
}

const useFetchProductsStore = create<FetchProductsStore>((set, get) => ({
  debouncing: false,
  setDebouncing: (debouncing: boolean) => set({ debouncing }),
  loading: false,
  fetched: false,
  data: [],
  fetch: async (search?: string) => {
    set({ loading: true, fetched: false });
    const response = await fetch(
      url.API_BASE + "/products" + (search ? `?search=${search}` : "")
    );
    if (!response.ok) throw new Error("Failed to fetch all products");
    const data = await response.json();
    validateProducts(data);
    set({ loading: false, fetched: true, data: data, debouncing: false });
  },
  generateMockProducts: async () => {
    set({ loading: true, fetched: false });
    const response = await fetch(url.API_BASE + "/generate_products");
    if (!response.ok) throw new Error("Failed to generate mock products");
    get().fetch();
  },
  deleteProduct: async (id: string) => {
    const response = await fetch(url.API_BASE + "/products/" + id, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete product");
    const data = await response.json();
    validateProducts(data);
    set((prev) => ({
      data: prev.data.filter((p) => p.id !== data.id),
    }));
  },
  updateProduct: async (product: IProduct) => {
    const response = await fetch(url.API_BASE + "/products/" + product.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error("Failed to update product");
    const data = await response.json();
    validateProducts(data);
    set((prev) => ({
      data: prev.data.map((p) => (p.id === data.id ? data : p)),
    }));
  },
}));

export {
  useFetchSingleProductStore as useSingleProduct,
  useFetchProductsStore as useProducts,
};
