export class UnitConversionUtility {
  static byteToString(sizeInBytes: number): string {
    if (sizeInBytes < 1024) {
      return sizeInBytes + " B"
    }
    sizeInBytes /= 1024;
    if (sizeInBytes < 1024) {
      return sizeInBytes.toFixed(2) + " kB"
    }
    sizeInBytes /= 1024;
    if (sizeInBytes < 1024) {
      return sizeInBytes.toFixed(2) + " MB"
    }
    sizeInBytes /= 1024;
    if (sizeInBytes < 1024) {
      return sizeInBytes.toFixed(2) + " GB"
    }
    sizeInBytes /= 1024;
    return sizeInBytes.toFixed(2) + " TB"
  }
}
