<script setup lang="ts">
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import createError from "http-errors";
import { useCollection, useFirestore } from "vuefire";
import { Project } from "../types/index";

let projects = useCollection(collection(useFirestore(), "competence-projects"));

if (!projects) {
  throw createError({ statusCode: 404, statusMessage: "No projects" });
}

const selectedproject = ref<Project>(null);

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

const showModal = (project: Project) => {
  selectedproject.value = project;
  const dialog = <HTMLDialogElement>document.getElementById("projectDialog");
  dialog.addEventListener("click", (ev: any) => {
    if (ev.target.id !== "wrapper") {
      //closeModal();
    }
  });
  dialog.showModal();
};
const closeModal = () => {
  const dialog = <HTMLDialogElement>document.getElementById("projectDialog");
  dialog.close();
};
</script>

<template>
  <div>
    <Dialog>
      <div v-if="selectedproject" id="wrapper">
        <Form @addToProject="addToProject" />
      </div>
    </Dialog>

    <div class="grid grid-cols-4 gap-4">
      <div v-for="project in projects" :key="project.id">
        <ProjectCard :project="project" @setSelectedProject="showModal" />
      </div>
    </div>
  </div>
</template>
