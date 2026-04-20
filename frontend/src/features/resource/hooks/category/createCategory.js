import { useCreateCategoryMutation } from "../../services/category_service/categoryService";

export default function useCreateCategory(){
    const [createCategory,{isLoading:createCategoryLoading}] = useCreateCategoryMutation();
    return {
        createCategory,
        createCategoryLoading
    }
}