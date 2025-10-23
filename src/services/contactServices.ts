import axiosClient from "./axiosClient";

export const submitForm = async (formData: unknown) => {
  const response = await axiosClient.post(`/contact/submit`, formData);
  return response.data;
};

export const submitNewsletter = async (name:string ,  email: string) => {
  const response = await axiosClient.post(`/contact/newsletter`, { name , email });
  return response.data;
};
