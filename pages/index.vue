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
