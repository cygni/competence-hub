<script setup lang="ts">
import { Project } from "../types/index";
import { useCollection, useFirestore } from "vuefire";
import createError from "http-errors";
import {
  collection,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const projectsCollection = useCollection(collection(useFirestore(), "project"));

console.log("collection", projectsCollection);

let projects = useCollection(collection(useFirestore(), "competence-projects"));
console.log("projects YEYYY", projects.value);

if (!projects) {
  throw createError({ statusCode: 404, statusMessage: "No projects" });
}

const selectedproject = ref<Project>();

const addToProject = (project: Project) => {
  console.log("adding project");

  if (
    project.title != "" ||
    project.description != "" ||
    project.contact != ""
  ) {
    setDoc(doc(useFirestore(), "competence-projects", project.title), {
      title: project.title,
      description: project.description,
      contact: project.contact,
      tags: project.tags,
    });
  }

  readProject();
};
const updateProject = (project: Project) => {
  console.log("updating project");

  if (
    project.title != "" ||
    project.description != "" ||
    project.contact != ""
  ) {
    updateDoc(doc(useFirestore(), "competence-projects", project.title), {
      title: project.title,
      description: project.description,
      contact: project.contact,
      tags: project.tags,
    });
  }
  readProject();
};
const deleteProject = (title: string) => {
  deleteDoc(doc(useFirestore(), "competence-projects", title));
};

const readProject = () => {
  projects = useCollection(collection(useFirestore(), "competence-projects"));
};

const showProject = (project: Project) => {
  selectedproject.value = project;
};

try {
  console.log("IN INDEX.VUE GETTING DATA");
  console.log("projects collection, ", projectsCollection);
  console.log("projects, ", projects);

  const { data, error } = await useFetch("/api/projects");
  projects.value = (data.value as Project[]) ?? [];
  if (error.value) {
    throw new Error(error.value.message);
  }
  console.log(data);
} catch (error) {
  console.error(error);
}

/*

export default {
  data() {
    return {
      title: "",
      description: "",
      tags: [],
      search: "",
      projectsData: [],
    };
  },
  firestore: {
    projectsData: db.collection("projects"),
  },
  methods: {
    createProject(
      title: string,
      description: string,
      contact: string,
      tags: Array<string>
    ) {
      if (title != "" || description != "" || contact != "") {
        db.collection("employees")
          .add({
            title: title,
            description: description,
            contact: contact,
            tags: tags,
          })
          .then(() => {
            console.log("Document successfully written!");
            this.readProjects();
          })
          .catch((error: Error) => {
            console.error("Error writing document: ", error);
          });
        // this.title = "";
        // this.description = "";
        // this.contact = "";
        // this.tags = "";
      }
    },
    readProjects() {
      let projectsData: Project[] = [];
      db.collection("projects")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc: Project) => {
            projectsData.push({
              title: doc.title,
              description: doc.description,
              contact: doc.contact,
              tags: doc.tags,
            });
            console.log(doc.title, " => ", doc);
          });
          return projectsData;
        })
        .catch((error: Error) => {
          console.log("Error getting documents: ", error);
        });
    },
    updateProject(
      title: string,
      description: string,
      contact: string,
      tags: Array<string>
    ) {
      db.collection("projects")
        .doc(title)
        .update({
          title: title,
          description: description,
          contact: contact,
          tags: tags,
        })
        .then(() => {
          console.log("Document successfully updated!");
          this.readProjects();
        })
        .catch((error: Error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    deleteProject(title: string) {
      db.collection("projects")
        .doc(title)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          this.readProjects();
        })
        .catch((error: Error) => {
          console.error("Error removing document: ", error);
        });
    },
  },
  mounted() {
    this.readProjects();
  },
}; */

</script>

<template>
  <div>
    <div class="flex justify-center mb-8">
      <Form @addToProject="addToProject" />
    </div>

    <div class="grid grid-cols-4 gap-4">
      <div v-for="project in projects" :key="project.id">
        <ProjectCard :project="project" @setSelectedProject="showProject" />
      </div>
    </div>
  </div>
</template>
