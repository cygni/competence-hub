import { collection, deleteDoc, doc } from "firebase/firestore";
import { useCollection, useFirestore } from "vuefire";
import { FilteredTags, TechTag } from "../types";

const collection_name = "competence-tags";

export const getFilteredTags = () => {
  const doc_refs = useCollection(collection(useFirestore(), collection_name));

  const res: any[] = [];

  doc_refs.value.forEach((tag) => {
    res.push({
      ...tag,
    });
  });

  const filteredTags: FilteredTags = filterTags(res);
  return filteredTags;
};

export const deleteTag = (tag: TechTag) => {
  deleteDoc(doc(useFirestore(), "competence-tags", tag.value));
};

export const getAllTags = () => {
  const doc_refs = useCollection(collection(useFirestore(), collection_name));

  const res: any[] = [];

  doc_refs.value.forEach((tag) => {
    res.push({
      ...tag,
    });
  });

  return res;
};

export const filterTags = (tags: any[]) => {
  let filter = { aspect: "frontend" };
  const frontendTags = tags?.filter(function (tag) {
    for (let key in filter) {
      if (tag[key] === undefined || tag[key] != filter[key]) return false;
    }
    return true;
  });

  filter.aspect = "backend";
  const backendTags = tags?.filter(function (tag) {
    for (let key in filter) {
      if (tag[key] === undefined || tag[key] != filter[key]) return false;
    }
    return true;
  });

  filter.aspect = "fullstack";
  const fullstackTags = tags?.filter(function (tag) {
    for (let key in filter) {
      if (tag[key] === undefined || tag[key] != filter[key]) return false;
    }
    return true;
  });

  filter.aspect = "embedded";
  const embeddedTags = tags?.filter(function (tag) {
    for (let key in filter) {
      if (tag[key] === undefined || tag[key] != filter[key]) return false;
    }
    return true;
  });

  return {
    fullstack: fullstackTags,
    frontend: frontendTags,
    backend: backendTags,
    embedded: embeddedTags,
  };
};
