import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { errorToast } from "../../../utils/Toaster";
import { useUpdateProfileMutation, useUploadAvatarMutation } from "../services/coreApi";

import imageFileExtensionValidaator, {
  getImageDimensions,
  imageFileSizeValidator,
} from "../validators";
export default function useProfileHook() {
  const [uploadAvatar, { data, isLoading: avatarIsLoading, isError }] =
    useUploadAvatarMutation();
  const [updateProfile,{ data: profile_data, isLoading: profle_loading, isError: profileError}] = useUpdateProfileMutation();
  const handleUpload = async (file) => {
    // send to server
    if (!file) return;
    try {
      if (!imageFileExtensionValidaator(file)) {
        throw new Error("Only JPG, PNG, or WEBP images are allowed");
      }
      if (!imageFileSizeValidator(file)) {
        throw new Error("File size must be less than 5MB");
      }
      const { width, height } = await getImageDimensions(file);
      if (width < 200 || height < 200) {
        throw new Error("Image too small");
      }

      if (width > 2000 || height > 2000) {
        throw new Error("Image too large");
      }
    } catch (error) {
      errorToast({ title: `${error.name}`, description: `${error.message}` });
      return;
    }
    try {
      uploadAvatar(file).unwrap();
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({
        title: "Upload failed",
        description: `${message || "An error occurred during upload."}`,
      });
    }
  };
  return {
    uploadAvatar,
    data,
    avatarIsLoading,
    isError,
    handleUpload,
    updateProfile,
    profile_data,
    profle_loading,
    profileError
  };
}
