export class LinkModel {
  href: string;
  name: LinkNames;
  templated = false;
}

export type Links = LinkModel | LinkModel[];

export enum LinkNames {
  CREATE = "CREATE",
  READ = "READ",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}
