export default function imageFileExtensionValidaator (value)  {
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

if (!ALLOWED_TYPES.includes(value.type)) {
  return false
}
return true
}

export function imageFileSizeValidator(value) {
  if (value.size > 5 * 1024 * 1024) {
    return false
  }
  return true
}

export function getImageDimensions(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      resolve({ width: img.width, height: img.height });
      URL.revokeObjectURL(url);
    };

    img.onerror = reject;
    img.src = url;
  });
}
