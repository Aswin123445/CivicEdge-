import { useCategoryUpdateMutation } from "../../services/category_service/categoryService";

export default function useUpdateCategory(){
    const [updateCategory,{isLoading:updateCategoryLoading}] = useCategoryUpdateMutation();
    return {
        updateCategory,
        updateCategoryLoading
    }
}