export type Project = {
  id: string;
  title: string;
  description: string;
  contact: string;
  tags: TechTag[];
  purpose: string;
  link: string;
  userID: string;
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

export enum Aspect {
  Backend = "backend",
  Fullstack = "fullstack",
  Frontend = "frontend",
  Embedded = "embedded",
}
