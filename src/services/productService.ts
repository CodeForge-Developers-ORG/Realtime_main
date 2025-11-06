import axiosClient from "./axiosClient";

export const getProducts = async (pageNum: number) => {
  const response = await axiosClient.get(`/content/products?page=${pageNum}`);
  return response.data;
};
export const getProductsWithoutPagination = async () => {
  const response = await axiosClient.get(`/content/products`);
  return response.data;
};

export const getProductBySlug = async (slug: string) => {
  const response = await axiosClient.get(`/content/products?slug=${slug}`);
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await axiosClient.get(`/content/products?category_id=${id}`);
  return response.data;
};
