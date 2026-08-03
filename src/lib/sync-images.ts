import fs from "fs";
import path from "path";

export function syncProductImages() {
  const rootPictureDir = path.join(process.cwd(), "picture");
  const publicImagesDir = path.join(process.cwd(), "public", "images");

  try {
    if (!fs.existsSync(publicImagesDir)) {
      fs.mkdirSync(publicImagesDir, { recursive: true });
    }

    if (fs.existsSync(rootPictureDir)) {
      const files = fs.readdirSync(rootPictureDir);

      files.forEach((file) => {
        const srcPath = path.join(rootPictureDir, file);
        const stat = fs.statSync(srcPath);
        if (stat.isFile()) {
          // Copy exact filename
          const destOriginal = path.join(publicImagesDir, file);
          fs.copyFileSync(srcPath, destOriginal);

          // Copy clean slugified filename
          const cleanName = file.toLowerCase().replace(/\s+/g, "-").replace(/--+/g, "-");
          const destClean = path.join(publicImagesDir, cleanName);
          if (destClean !== destOriginal) {
            fs.copyFileSync(srcPath, destClean);
          }
        }
      });
    }
  } catch (error) {
    console.error("Error syncing picture folder to public/images:", error);
  }
}
