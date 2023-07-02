export class LinkModel {
  href: string;
  name: LinkName;
  templated = false;
}

export type Links = LinkModel | LinkModel[];

export enum LinkName {
  CREATE = "CREATE",
  READ = "READ",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  SEARCH = "SEARCH",
}
