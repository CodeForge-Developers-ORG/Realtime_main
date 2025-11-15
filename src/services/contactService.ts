// src/services/contactService.ts

import axiosClient from "./axiosClient";

export async function fetchContactInfo() {
  try {
    const res = await axiosClient.get("/contact-info");
    return res.data?.data || null;
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return null;
  }
}
