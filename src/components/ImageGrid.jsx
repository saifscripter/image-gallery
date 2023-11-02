import { useContext, useState } from "react";
import { BsImages } from "react-icons/bs";
import ImageContext from "../contexts/ImageContext";
import DraggableImage from "./DraggableImage";

const ImageGrid = () => {
  const [draggedImageIndex, setDraggedImageIndex] = useState(null);
  const [images, setImages] = useContext(ImageContext);

  // Handler for Image Adding

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      // File is an image
      const _images = [...images];

      let files = event.target.files;

      files = Array.from(files).map((file) => ({
        src: URL.createObjectURL(file),
      }));
      _images.push(...files);
      setImages(_images);
    } else {
      // File is not an image
      alert("Please select a valid image file.");
    }

    event.target;
  };

  // Handler for toggling image selection
  const toggleImageSelection = (event, index) => {
    let _images = [...images];
    // Set 'selected' property true of false for a specific image
    _images[index].selected = event.target.checked;

    setImages(_images);
  };

  // Handler for Image Reordering
  const handleImageReorder = (startIndex, endIndex) => {
    const _images = [...images];

    // Remove draggedImage from the startIndex (this will return the removed image)
    const [draggedImage] = _images.splice(startIndex, 1);
    // Add the dragged image at the endIndex
    _images.splice(endIndex, 0, draggedImage);

    setImages(_images);
  };

  // Handle image reordering when drag over a target
  const handleDragOver = (e, index) => {
    e.preventDefault();

    // If dragged image index and drop target index are not the same
    if (draggedImageIndex !== index) {
      // Handle Image Reorder
      handleImageReorder(draggedImageIndex, index);
      // Select the dropped image as dragged image
      setDraggedImageIndex(index);
    }
  };

  return (
    <div className="p-3 lg:px-10 lg:py-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-5 image-container bg-[#f9f9f9]">
      {/* Image Grid */}
      {images?.map(({ src, selected }, index) => (
        <DraggableImage
          key={src}
          src={src}
          handleDragStart={() => setDraggedImageIndex(index)}
          handleDragOver={(e) => handleDragOver(e, index)}
          toggleImageSelection={(e) => toggleImageSelection(e, index)}
          selected={selected}
        />
      ))}

      {/* Add Image Input */}
      <div className="w-full bg-red-50 shadow aspect-square border-dashed border bg-opacity-30 border-gray-400 flex flex-col items-center justify-center gap-2 rounded-lg relative">
        <input
          multiple
          type="file"
          accept="image/*"
          className="absolute inset-0 z-10 opacity-0 cursor-pointer"
          onChange={handleFileChange}
          //To reset the input's value and trigger the onchange event even if the same path is selected
          onClick={(e) => (e.target.value = null)}
        />
        <BsImages className="text-2xl" />
        <p className="text-center font-semibold text-lg">Add Images</p>
      </div>
    </div>
  );
};

export default ImageGrid;
