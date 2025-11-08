import { Metadata } from "next";
import CategoryClient from "./CategoryClient";
import { getProductByCategorySlug } from "@/services/productService";

type Props = {
  params: { slug: string };
};  

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await getProductByCategorySlug(slug);
    
    if (res.success && res.data.length > 0) {
      const category = res.data[0];
      return {
        title: category.meta_title || `${category.name} - Realtime Biometrics`,
        description: category.meta_description || category.description || `Browse our ${category.name} collection`,
      };
    }
  } catch (error) {
    console.error("Error fetching category metadata:", error);
  }

  return {
    title: "Products - Realtime Biometrics",
    description: "Browse our product collection",
  };
}

export default function CategoryPage({ params }: Props) {
  return <CategoryClient params={params} />;
}