import { useState } from "react";
import { ImageMessage } from "../types";

export const useImageActions = () => {
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [showCopyError, setShowCopyError] = useState(false);

  // Handle image click for full screen
  const handleImageClick = (imageUrl: string) => {
    window.open(imageUrl, "_blank");
  };

  // Handle image download
  const handleDownloadImage = (imageToDownload: ImageMessage) => {
    if (imageToDownload && imageToDownload.imageBlob) {
      const link = document.createElement("a");
      const objectUrl = URL.createObjectURL(imageToDownload.imageBlob);
      link.href = objectUrl;
      link.download = `image-${imageToDownload.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);
    }
  };

  // Handle image copy
  const handleCopyImage = async (imageToCopy: ImageMessage) => {
    console.log("handleCopyImage called with:", imageToCopy.id);
    if (imageToCopy && imageToCopy.imageBlob) {
      console.log(
        "Image blob exists, type:",
        imageToCopy.imageBlob.type,
        "size:",
        imageToCopy.imageBlob.size
      );
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            [imageToCopy.imageBlob.type]: imageToCopy.imageBlob,
          }),
        ]);
        console.log("Image copied successfully using ClipboardItem!");
        setShowCopySuccess(true);
        setTimeout(() => setShowCopySuccess(false), 2000);
      } catch (err: any) {
        console.warn(
          "Direct ClipboardItem write failed, attempting canvas fallback:",
          err
        );
        try {
          const img = new Image();
          img.src = URL.createObjectURL(imageToCopy.imageBlob);
          img.onload = async () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(img, 0, 0);
              canvas.toBlob(
                async (blob) => {
                  if (blob) {
                    await navigator.clipboard.write([
                      new ClipboardItem({
                        "image/png": blob,
                      }),
                    ]);
                    console.log(
                      "Image copied successfully using canvas fallback (PNG)!"
                    );
                    setShowCopySuccess(true);
                    setTimeout(() => setShowCopySuccess(false), 2000);
                  } else {
                    throw new Error("Failed to create blob from canvas.");
                  }
                },
                "image/png"
              );
            } else {
              throw new Error("Failed to get canvas context.");
            }
          };
          img.onerror = (e) => {
            throw new Error("Failed to load image for canvas fallback: " + e);
          };
        } catch (canvasErr) {
          console.error(
            "Failed to copy image even with canvas fallback:",
            canvasErr
          );
          setShowCopyError(true);
          setTimeout(() => setShowCopyError(false), 2000);
        }
      }
    } else {
      console.warn("No image or image blob found to copy.");
      alert("No image selected to copy.");
    }
  };

  return {
    showCopySuccess,
    showCopyError,
    handleImageClick,
    handleDownloadImage,
    handleCopyImage,
  };
}; 