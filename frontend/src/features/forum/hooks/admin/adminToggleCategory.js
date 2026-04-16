import { useAdminToggleCategoryMutation } from "../../services/admin/forumServices";

export default function useToggleCategory() {
  const [toggleCategory, { isLoading: toggleCategoryLoading }] =
    useAdminToggleCategoryMutation();
  return {
    toggleCategoryLoading,
    toggleCategory,
  };
}
