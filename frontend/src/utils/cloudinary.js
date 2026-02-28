import { extractErrorMessage } from "./extractErrorMessage";
import { errorToast } from "./Toaster";

export const uploadToCloudinary = async (file) => {
  try {
    const formData = new FormData();

    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Cloudinary upload failed");
    }

    return await response.json(); // 👈 success response
  } catch (err) {
    const message = extractErrorMessage(err);
    errorToast({title:"Image upload failed",description:`${message || 'An error occurred during image upload.'}`});
  }
};

export const uploadImagesBatch = async (files,setCloudinaryLoading) => {
  try {
    setCloudinaryLoading(true);
    return await Promise.all(files.map(uploadToCloudinary));
    
  } catch (err) {
    const message = extractErrorMessage(err);
    errorToast({title:"Image upload failed",description:`${message || 'An error occurred during image upload.'}`});
  }
};