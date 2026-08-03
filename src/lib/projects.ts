import fs from "fs";
import path from "path";

export interface ProjectItem {
  id: string;
  title: string;
  imageUrl: string;
  sortOrder: number;
}

const DEFAULT_PROJECT_FILES = [
  { original: "ACP wall claiding proj.jpg", clean: "acp-wall-cladding-proj.jpg", title: "ACP Wall Cladding Project" },
  { original: "Beveled mirrors proj 1.jpeg", clean: "beveled-mirrors-proj-1.jpeg", title: "Decorative Beveled Mirror Wall" },
  { original: "Beveled mirrors proj 2.jpeg", clean: "beveled-mirrors-proj-2.jpeg", title: "Custom Beveled Mirror Wall" },
  { original: "Decorative glass door pannel proj.jpg", clean: "decorative-glass-door-pannel-proj.jpg", title: "Decorative Glass Door Panel" },
  { original: "Frosted glass door proj 1.jpeg", clean: "frosted-glass-door-proj-1.jpeg", title: "Frosted Glass Door Installation" },
  { original: "Frosted glass door proj 2.jpeg", clean: "frosted-glass-door-proj-2.jpeg", title: "Privacy Frosted Glass Door" },
  { original: "LED mirror proj 1.jpeg", clean: "led-mirror-proj-1.jpeg", title: "LED Smart Mirror Installation" },
  { original: "LED mirror proj 2.jpeg", clean: "led-mirror-proj-2.jpeg", title: "Backlit LED Mirror Installation" },
  { original: "LED mirror proj 3.jpeg", clean: "led-mirror-proj-3.jpeg", title: "Luxury LED Smart Mirror" },
  { original: "shower cabin proj 1.jpeg", clean: "shower-cabin-proj-1.jpeg", title: "Frameless Shower Cabin" },
  { original: "shower cabin proj 2.jpeg", clean: "shower-cabin-proj-2.jpeg", title: "Modern Shower Cabin Installation" },
  { original: "Stairs railing  proj.jpg", clean: "stairs-railing-proj.jpg", title: "Staircase Glass Railing" },
  { original: "texture crestal glass proj.jpg", clean: "texture-crestal-glass-proj.jpg", title: "Texture Crystal Glass Panel" },
];

export function syncAndGetProjects(): ProjectItem[] {
  const rootProjectsDir = path.join(process.cwd(), "projects");
  const publicProjectsDir = path.join(process.cwd(), "public", "projects");

  try {
    if (!fs.existsSync(publicProjectsDir)) {
      fs.mkdirSync(publicProjectsDir, { recursive: true });
    }

    if (fs.existsSync(rootProjectsDir)) {
      const files = fs.readdirSync(rootProjectsDir);

      files.forEach((file) => {
        const srcPath = path.join(rootProjectsDir, file);
        const stat = fs.statSync(srcPath);
        if (stat.isFile()) {
          // Copy original filename
          const destPathOriginal = path.join(publicProjectsDir, file);
          fs.copyFileSync(srcPath, destPathOriginal);

          // Also copy clean filename if applicable
          const cleanName = file.toLowerCase().replace(/\s+/g, "-").replace(/--+/g, "-");
          const destPathClean = path.join(publicProjectsDir, cleanName);
          if (destPathClean !== destPathOriginal) {
            fs.copyFileSync(srcPath, destPathClean);
          }
        }
      });
    }
  } catch (error) {
    console.error("Error syncing project images:", error);
  }

  // Return formatted project list from public/projects or default files
  return DEFAULT_PROJECT_FILES.map((item, index) => ({
    id: `proj-${index + 1}`,
    title: item.title,
    imageUrl: `/projects/${encodeURIComponent(item.original)}`,
    sortOrder: index,
  }));
}
