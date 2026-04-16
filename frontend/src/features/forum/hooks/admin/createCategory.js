import { useCategoryCreateMutation } from "../../services/admin/forumServices";

export default function useCategoryCreate() {
    const [createCategory, { isLoading: createCategoryLoading }] = useCategoryCreateMutation();
    return {
        createCategoryLoading,
        createCategory
    }
}