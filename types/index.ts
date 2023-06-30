export type Project = {
  title: string;
  description: string;
  contact: string;
  tags: string[];
};

export type TechTag = {
  value: string;
  aspect: string;
};

export enum Mode {
  Overview = "Overview",
  Edit = "Edit",
  Read = "Read",
  New = "New",
}
