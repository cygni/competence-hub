<script setup lang="ts">
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import createError from "http-errors";
import { storeToRefs } from "pinia";
import { useCollection, useFirestore } from "vuefire";
import { useModeStore } from "../store/index";
import { Mode, Project } from "../types/index";

let projects = useCollection(collection(useFirestore(), "competence-projects"));

if (!projects) {
  throw createError({ statusCode: 404, statusMessage: "No projects" });
}

let selectedproject = ref<Project>();
const modeStore = useModeStore();
const { getMode } = storeToRefs(modeStore);
const mode = getMode.value;
const { setReadMode, setEditMode, setNewMode, setOverviewMode } = modeStore;

const addToProject = (project: Project) => {
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
  modeSore.setViewMode();
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
  isEditProject = false;
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
  setReadMode();
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

console.log("mode - inside index.vue", mode.value);
console.log("current mode - index.vue", mode.value);
</script>

<template>
  <div>
    <button class="w-full btn" :onClick="setNewMode">Create new project</button>
    <button class="w-full btn" :onClick="setOverviewMode">
      Go to overview
    </button>
    <div class="flex justify-center mb-8">
      <Form
        v-if="mode != Mode.Overview"
        :selectedproject="selectedproject"
        @addToProject="addToProject"
        @updateProject="updateProject"
        @setEditMode="setEditMode"
      />
    </div>
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
