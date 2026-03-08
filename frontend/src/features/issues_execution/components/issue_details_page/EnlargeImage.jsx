
const EnlargeImage = ({selectedImage, setSelectedImage}) => {
  return (
    <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage?.cloudinary_url}
            className="max-w-full max-h-full rounded-lg shadow-2xl"
            alt="Preview"
          />
          <button className="absolute top-8 right-8 text-white text-3xl">
            &times;
          </button>
        </div>
  )
}

export default EnlargeImage
