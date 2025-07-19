import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddProductSchema, AddProductSchemaType } from "../domain/productValidation";

export function useProductForm() {
  return useForm<AddProductSchemaType>({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      category: "",
    },
  });
}
