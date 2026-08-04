import fs from "fs";
import path from "path";

export function syncProductImages() {
  const rootPictureDir = path.join(process.cwd(), "picture");
  const publicImagesDir = path.join(process.cwd(), "public", "images");
  const rootProjectsDir = path.join(process.cwd(), "projects");
  const publicProjectsDir = path.join(process.cwd(), "public", "projects");

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

    if (!fs.existsSync(publicProjectsDir)) {
      fs.mkdirSync(publicProjectsDir, { recursive: true });
    }

    if (fs.existsSync(rootProjectsDir)) {
      const files = fs.readdirSync(rootProjectsDir);

      files.forEach((file) => {
        const srcPath = path.join(rootProjectsDir, file);
        const stat = fs.statSync(srcPath);
        if (stat.isFile()) {
          const destOriginal = path.join(publicProjectsDir, file);
          fs.copyFileSync(srcPath, destOriginal);

          const cleanName = file.toLowerCase().replace(/\s+/g, "-").replace(/--+/g, "-");
          const destClean = path.join(publicProjectsDir, cleanName);
          if (destClean !== destOriginal) {
            fs.copyFileSync(srcPath, destClean);
          }
        }
      });
    }

    // Copy logo to favicon / icon.png for browser tabs
    const logoSrc = path.join(publicImagesDir, "logo.png");
    if (fs.existsSync(logoSrc)) {
      fs.copyFileSync(logoSrc, path.join(process.cwd(), "public", "icon.png"));
      fs.copyFileSync(logoSrc, path.join(process.cwd(), "public", "favicon.ico"));
    }

    console.log("✅ Successfully synced local images, project assets, and browser favicons to public/");
  } catch (error) {
    console.error("Error syncing picture folder to public/images:", error);
  }
}

if (require.main === module) {
  syncProductImages();
}

