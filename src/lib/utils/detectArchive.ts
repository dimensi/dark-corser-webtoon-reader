export type ArchiveType = 'zip' | 'rar' | 'unknown';

const ZIP_SIGNATURE = [0x50, 0x4b, 0x03, 0x04];
const RAR_SIGNATURE = [0x52, 0x61, 0x72, 0x21, 0x1a, 0x07];

export function detectArchive(bytes: Uint8Array): ArchiveType {
  if (bytes.length >= ZIP_SIGNATURE.length && ZIP_SIGNATURE.every((byte, index) => bytes[index] === byte)) {
    return 'zip';
  }

  if (bytes.length >= RAR_SIGNATURE.length && RAR_SIGNATURE.every((byte, index) => bytes[index] === byte)) {
    return 'rar';
  }

  return 'unknown';
}
