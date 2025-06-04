// Helper function to convert blob to data URL
export function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Scale image function
export async function scaleImageTo1Megapixel(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.onload = () => {
      const originalWidth = img.width;
      const originalHeight = img.height;
      const originalPixels = originalWidth * originalHeight;
      const targetPixels = 1000000;

      let newWidth, newHeight;

      if (originalPixels <= targetPixels) {
        newWidth = originalWidth;
        newHeight = originalHeight;
      } else {
        const scaleFactor = Math.sqrt(targetPixels / originalPixels);
        newWidth = Math.round(originalWidth * scaleFactor);
        newHeight = Math.round(originalHeight * scaleFactor);
      }

      canvas.width = newWidth;
      canvas.height = newHeight;
      if (ctx) {
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
      } else {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to create scaled image"));
          }
        },
        "image/jpeg",
        0.9
      );
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    img.src = URL.createObjectURL(file);
  });
} 