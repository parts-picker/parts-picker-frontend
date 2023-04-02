export enum ItemStatus {
  NEEDED = "NEEDED",
  ORDERED = "ORDERED",
  IN_TRANSIT = "IN_TRANSIT",
  IN_STOCK = "IN_STOCK",
  RESERVED = "RESERVED",
  USED = "USED",
  DISPOSED = "DISPOSED",
  UNKNOWN = "UNKNOWN",
}

export enum ItemStatusForCreate {
  ORDERED = "ORDERED",
  IN_STOCK = "IN_STOCK",
}
