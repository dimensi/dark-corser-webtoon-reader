import JSZip from 'jszip';
import { compareFileNames } from '$lib/utils/sortFiles';

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.svg'];

export interface ZipImageEntry {
  name: string;
  file: JSZip.JSZipObject;
}

export async function listZipImages(blob: Blob): Promise<ZipImageEntry[]> {
  const zip = await JSZip.loadAsync(blob);
  const entries = Object.values(zip.files).filter((file) => {
    if (file.dir) return false;
    const lowerName = file.name.toLowerCase();
    return IMAGE_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
  });

  entries.sort((a, b) => compareFileNames(a.name, b.name));

  return entries.map((file) => ({ name: file.name, file }));
}
