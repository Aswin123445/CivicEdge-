import { useToggleCategoryStatusMutation } from "../../services/category_service/categoryService";

export default function useToggleCategory(){
    const [toggleCategory,{isLoading:toggleCategoryLoading}] = useToggleCategoryStatusMutation();
    return {
        toggleCategory,
        toggleCategoryLoading
    }
}